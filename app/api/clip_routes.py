from flask import Blueprint, request, jsonify, render_template, redirect
from flask_login import current_user, login_required
from app.models import Clip, Comment, Like, db
from sqlalchemy.orm import joinedload
from sqlalchemy import update, and_, delete, select
from app.api.aws import upload_file_to_s3, get_unique_filename, remove_file_from_s3
from ..forms import ClipForm, EditClipForm, CommentForm, LikeForm


clip_routes = Blueprint('clips', __name__)


# Get all Clips
@clip_routes.route('/')
def get_all_clips():
    # Use joinedload to efficiently fetch related user data in one query
    clips = Clip.query.options(joinedload(Clip.uploader)).all()
    response = {'clips': []}

    for clip in clips:
        clip_data = clip.to_dict()
        clip_data['creator'] = clip.uploader.username
        response['clips'].append(clip_data)

    return jsonify(response)


# Get a Clip by clipId
@clip_routes.route('/<int:clip_id>', methods=['GET', 'PUT', 'DELETE'])
def get_clip_by_id(clip_id):
    clip = (
        Clip.query
        .options(joinedload(Clip.comments_on_clip))
        .filter_by(id=clip_id)
        .first()
    )
    query_likes = select([Like]).where(Like.c.clip_id == clip.id, Like.c.is_like == True)
    query_dislikes = select([Like]).where(Like.c.clip_id == clip.id, Like.c.is_like == False)
    num_likes = db.session.execute(query_likes).scalar() or 0
    num_dislikes = db.session.execute(query_dislikes).scalar() or 0
    

    # if there is no clip associated with the clipId
    if not clip:
        response = jsonify({"error": "Clip couldn't be found"})
        response.status_code = 404
        return response

    if request.method == 'GET':
        clip_data = clip.to_dict()
        clip_data['creator'] = clip.uploader.username

        # if the clip is private & the user logged in is not the creator of the clip
        if clip_data['is_private'] and clip.user_id != current_user.id:
            response = jsonify({"error": "You are not authorized to view this clip"})
            return response, 403

        clip_data['comments'] = [comment.to_dict() for comment in clip.comments_on_clip]
        clip_data['num_likes'] = num_likes
        clip_data['dislikes_count'] = num_dislikes

        return clip_data

    if request.method in ["PUT", "DELETE"]:
        if current_user.is_authenticated and clip.user_id == current_user.id:
            pass
        else:
            return jsonify({"error": "Unauthorized access"}), 403

    if request.method == "PUT":
        form = EditClipForm(obj=clip)

        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            clip.location = form.location.data
            clip.caption = form.caption.data
            clip.is_private = form.is_private.data
            
            db.session.commit()
            return jsonify({"message": "Clip has been updated successfully"}), 200
        else:
            error_messages = {}
            for field, errors in form.errors.items():
                error_messages[field] = errors[0]

            response = jsonify({
                "message": "Bad Request",
                "error": error_messages,
            })
            response.status_code = 400
            return response

    if request.method == 'DELETE':
        remove_file_from_s3(clip.video_file)
        db.session.delete(clip)
        db.session.commit()
        return jsonify({"message": "Successfully Deleted"})


# Get clips by userId
@clip_routes.route('users/<int:user_id>')
def get_clip_by_userId(user_id):
    clips = Clip.query.filter(Clip.user_id == user_id).all()
    print(clips)

    if not clips:
        response = jsonify({"error": "Creator couldn't be found"})
        response.status_code = 404
        return response

    response = {'clips': []}

    for clip in clips:
        clip_data = clip.to_dict()
        response['clips'].append(clip_data)
    return jsonify(response)


# Get clips by current user
@clip_routes.route('/current')
@login_required
def get_clip_by_current_user():

    clips = Clip.query.filter(Clip.user_id == current_user.id).all()
    clips_arr = []

    for clip in clips:
        clip_data = clip.to_dict()
        clips_arr.append(clip_data)
    return jsonify(clips_arr)

# Create a clip
@clip_routes.route('/new', methods=['GET', 'POST'])
@login_required
def create_clip():

    form = ClipForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        location = form.location.data
        caption = form.caption.data
        is_private = form.is_private.data
        video_file = form.file.data
        video_file.filename = get_unique_filename(video_file.filename)
        upload = upload_file_to_s3(video_file)

        if "url" not in upload:
        # if the dictionary doesn't have a url key
            return jsonify({"error": "File upload failed", "details": upload}), 400


        url = upload["url"]

        new_clip = Clip(location = location,
                        caption = caption,
                        is_private = is_private,
                        video_file = url,
                        user_id = current_user.id)
        db.session.add(new_clip)
        db.session.commit()
        return jsonify({"message": "Clip successfully posted."}), 201

    print(form.errors)
    errors = {}
    for field, error in form.errors.items():
        field_obj = getattr(form, field)
        errors[field_obj.label.text] = error[0]
    error_response = {
        "message": "Body validation errors",
        "error": errors
    }
    return jsonify(error_response), 400


# Create a comment for a Clip based on clipId
@clip_routes.route('/<int:clip_id>/comments', methods=['POST'])
@login_required
def create_comment(clip_id):

    clip = Clip.query.get(clip_id)

    if not clip:
        response = jsonify({"error": "Clip couldn't be found"})
        response.status_code = 404
        return response

    form = CommentForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        text = form.body.data

        new_comment = Comment(
            body=text,
            user_id=current_user.id,
            clip_id=clip_id
            )
        db.session.add(new_comment)
        db.session.commit()
        return jsonify({"message": "Comment successfully created."}), 201

    errors = {}
    for field, error in form.errors.items():
        field_obj = getattr(form, field)
        errors[field_obj.label.text] = error[0]
    error_response = {
        "message": "Body validation errors",
        "error": errors
    }
    return jsonify(error_response), 400


# Create a like for a Clip based on clipId, update a like to dislike, delete a like
@clip_routes.route('/<int:clip_id>/likes', methods=['POST'])
@login_required
def create_like(clip_id):

    clip = Clip.query.get(clip_id)

    if not clip:
        response = jsonify({"error": "Clip couldn't be found"})
        response.status_code = 404
        return response
    
    existing_like = db.session.query(Like).filter(
    Like.c.user_id == current_user.id, 
    Like.c.clip_id == clip_id
    ).first()

    if request.method == 'POST':
        if existing_like:
            if current_user.is_authenticated and existing_like.user_id == current_user.id:
                pass
            else:
                return jsonify({"error": "Unauthorized access"}), 403
            
            if existing_like.is_like == False:
                update_stmt = (
                    update(Like)
                    .where(and_(Like.c.user_id == current_user.id, Like.c.clip_id == clip.id))
                    .values(is_like=not existing_like.is_like)
                )
                db.session.execute(update_stmt)
                db.session.commit()
                return jsonify({"message": "You have successfully updated the like/dislike."}), 200
            
            if existing_like.is_like == True:
                deleted_like_sql = delete(Like).where(
                Like.c.user_id == current_user.id,
                Like.c.clip_id == clip_id
                )
                db.session.execute(deleted_like_sql)
                db.session.commit()
                return jsonify({"message": "Successfully Deleted Like"}), 200

        else:
            # Create new like/dislike
            create_like = {"user_id": current_user.id, "clip_id": clip_id, "is_like": True}
            db.session.execute(Like.insert(), create_like)
            db.session.commit()
            return jsonify({"message": "You have successfully liked the clip."}), 201
    
    # if request.method == "PUT":
    #     existing_like = db.session.query(Like).filter(
    #         Like.c.user_id == current_user.id,
    #         Like.c.clip_id == clip_id
    #     ).first()

    #     if existing_like:
    #         update_stmt = (
    #             update(Like)
    #             .where(and_(Like.c.user_id == current_user.id, Like.c.clip_id == clip.id))
    #             .values(is_like=not existing_like.is_like)
    #         )

    #         db.session.execute(update_stmt)
    #         db.session.commit()
    #         return jsonify({"message": "You have successfully updated the like/dislike."}), 200

    #     else:
    #         return jsonify({"error": "Like/Dislike not found"}), 404
        

# Create a dislike for a Clip based on clipId, update a dislike to like, delete a dislike
@clip_routes.route('/<int:clip_id>/dislikes', methods=['POST'])
@login_required
def create_dislike(clip_id):

    clip = Clip.query.get(clip_id)

    if not clip:
        response = jsonify({"error": "Clip couldn't be found"})
        response.status_code = 404
        return response
    
    existing_like = db.session.query(Like).filter(
    Like.c.user_id == current_user.id, 
    Like.c.clip_id == clip_id
    ).first()

    if request.method == 'POST' or 'DELETE':
        if existing_like:
            if current_user.is_authenticated and existing_like.user_id == current_user.id:
                pass
            else:
                return jsonify({"error": "Unauthorized access"}), 403
            
            if existing_like.is_like == True:
                update_stmt = (
                    update(Like)
                    .where(and_(Like.c.user_id == current_user.id, Like.c.clip_id == clip.id))
                    .values(is_like=not existing_like.is_like)
                )
                db.session.execute(update_stmt)
                db.session.commit()
                return jsonify({"message": "You have successfully updated the like/dislike."}), 200
        
            if existing_like.is_like == False:
                deleted_like_sql = delete(Like).where(
                Like.c.user_id == current_user.id,
                Like.c.clip_id == clip_id
                )
                db.session.execute(deleted_like_sql)
                db.session.commit()
                return jsonify({"message": "Successfully Deleted Dislike"}), 200
        
        else:
            # Create new like/dislike
            create_dislike = {"user_id": current_user.id, "clip_id": clip_id, "is_like": False}
            db.session.execute(Like.insert(), create_dislike)
            db.session.commit()
            return jsonify({"message": "You have successfully disliked the clip."}), 201
