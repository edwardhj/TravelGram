from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import Clip, db, Like, Follow, User
from sqlalchemy import delete, update, and_

follow_routes = Blueprint('follows', __name__)


@follow_routes.route('/followers/<int:user_id>', methods=["GET"])
def get_all_followers(user_id):
    """
    Query for all followers of a user
    """

    followers = (
        db.session.query(User)
        .join(Follow, Follow.c.follower_user_id == User.id)
        .filter(Follow.c.following_user_id == user_id)
        .all()
    )

    followerList = []

    for follow in followers:
        follow_data = follow.to_dict()

        followerList.append(follow_data)
    return followerList


@follow_routes.route('/following/<int:user_id>', methods=["GET", "POST", "PUT", "DELETE"])
def get_all_follows(user_id):
    """
    Query for all users one user follows
    Query for creating a follow (must be logged in)
    """

    user = User.query.get(user_id)

    if not user:
        return jsonify({"error": "User not found"}), 404
    
    if request.method == "GET":
        follows = (
            db.session.query(User)
            .join(Follow, Follow.c.following_user_id == User.id)
            .filter(Follow.c.follower_user_id == user_id)
            .all()
        )

        followingList = []

        for follow in follows:
            follow_data = follow.to_dict()

            followingList.append(follow_data)
        return followingList

    if request.method == "POST":
        if not current_user.is_authenticated:
            return jsonify({"message": "Unauthorized access"}), 403
        
        existing_follow = db.session.query(Follow).filter(
            Follow.c.follower_user_id == current_user.id, 
            Follow.c.following_user_id == user_id
            ).first()
        
        # if a follow already exists
        if existing_follow:
            return jsonify({"error": "You are already following this user"}), 400
        
        # if you try to follow yourself
        if current_user.id == user.id:
            return jsonify({"error": "You cannot follow yourself"}), 400

        # else create a new follow
        new_follow = {"following_user_id": user_id, "follower_user_id": current_user.id}
        db.session.execute(Follow.insert(), new_follow)
        db.session.commit()
        return jsonify({"message": "You are now following this user."}), 201

    if request.method == "PUT":
        existing_follow = db.session.query(Follow).filter(
            Follow.c.follower_user_id == current_user.id, 
            Follow.c.following_user_id == user_id
            ).first()

        if existing_follow:
            update_stmt = (
                update(Follow)
                .where(and_(Follow.c.follower_user_id == current_user.id, Follow.c.following_user_id == user_id))
                .values(is_close_friend=not existing_follow.is_close_friend)
            )

            db.session.execute(update_stmt)
            db.session.commit()
            return jsonify({"message": "You have successfully updated your close friends list."}), 200

        else:
            return jsonify({"error": "Follow not found"}), 404
        
    if request.method == "DELETE":
        deleted_follow_sql = delete(Follow).where(
            Follow.c.follower_user_id == current_user.id, 
            Follow.c.following_user_id == user_id
        )
        db.session.execute(deleted_follow_sql)
        db.session.commit()
        return jsonify({"message": "Successfully Deleted"})