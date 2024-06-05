from flask import Blueprint, request, jsonify, render_template, redirect
from flask_login import current_user, login_required
from app.models import Clip, Comment, db
from sqlalchemy.orm import joinedload
# from app.api.aws import upload_file_to_s3, get_unique_filename, remove_file_from_s3, create_presigned_url
from ..forms import ClipForm, EditClipForm, CommentForm


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
    clip = Clip.query.options(joinedload(Clip.comments_on_clip)).filter_by(id=clip_id).first()


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
            return jsonify({"message": "Clip has been updated successfully"}), 201
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
        # remove_file_from_s3(album.image_url)
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
    return response


# Get clips by current user
@clip_routes.route('/current')
@login_required
def get_clip_by_current_user():

    clips = Clip.query.filter(Clip.user_id == current_user.id).all()
    clips_arr = []

    for clip in clips:
        clip_data = clip.to_dict()
        clips_arr.append(clip_data)
    return clips_arr

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
        # imageUrl = form.imageUrl.data
        # imageUrl.filename = get_unique_filename(imageUrl.filename)
        # upload = upload_file_to_s3(imageUrl)
        # print(upload)

        # if "url" not in upload:
        # # if the dictionary doesn't have a url key
        #     return render_template("create_album.html", form=form, errors=[upload])

        # url = upload["url"]

        new_clip = Clip(location = location,
                        caption = caption,
                        is_private = is_private,
                        video_file = video_file,
                        # image_url = url,
                        user_id = current_user.id)
        db.session.add(new_clip)
        db.session.commit()
        return jsonify({"message": "Clip successfully created."}), 201

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


