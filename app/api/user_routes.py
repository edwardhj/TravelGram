from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, db, Follow

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users except the logged-in user and returns them in a list of user dictionaries
    """
    users = User.query.all()
    filtered_users = [user.to_dict() for user in users if user.id != current_user.id]
    return {'users': filtered_users}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)

    user_dict = user.to_dict()

    follower_count = db.session.query(Follow).filter(Follow.c.following_user_id == user.id).count()
    following_count = db.session.query(Follow).filter(Follow.c.follower_user_id == user.id).count()

    user_dict['followers_count'] = follower_count
    user_dict['following_count'] = following_count

    return user_dict
