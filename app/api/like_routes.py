from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import Clip, db, Like
from sqlalchemy import delete

likes_routes = Blueprint('likes', __name__)


@likes_routes.route('/likes', methods=["GET"])
@login_required
def get_all_liked_clips():
    """
    Query for all liked clips by the logged in user
    """
    user_id = current_user.id

    liked_clips = (
    db.session.query(Clip)
    .join(Like, Like.c.clip_id == Clip.id)
    .filter(Like.c.user_id == user_id, Like.c.is_like == True)
    .all()
    )

    clipList = []

    for clip in liked_clips:
        clip_data = clip.to_dict()

        clipList.append(clip_data['id'])
    return jsonify(clipList)


@likes_routes.route('/dislikes', methods=["GET"])
@login_required
def get_all_disliked_clips():
    """
    Query for all disliked clips by the logged in user
    """
    user_id = current_user.id

    disliked_clips = (
    db.session.query(Clip)
    .join(Like, Like.c.clip_id == Clip.id)
    .filter(Like.c.user_id == user_id, Like.c.is_like == False)
    .all()
    )

    clipList = []

    for clip in disliked_clips:
        clip_data = clip.to_dict()

        clipList.append(clip_data['id'])
    return jsonify(clipList)