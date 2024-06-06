from flask import Blueprint, request, jsonify, render_template, redirect
from flask_login import current_user, login_required
from app.models import Comment, db
from ..forms import CommentForm


comment_routes = Blueprint('comments', __name__)


# Get all Comments Written by Logged In User
@comment_routes.route('/current')
@login_required
def get_all_comments():
    comments = Comment.query.filter(Comment.user_id == current_user.id).all()

    response = []

    for comment in comments:
        comment_data = comment.to_dict()
        response.append(comment_data)

    return jsonify(response)


# Edit a Comment
@comment_routes.route('/<int:comment_id>', methods=['PUT', 'DELETE'])
@login_required
def edit_comment_by_commentId(comment_id):
    comment = Comment.query.filter(Comment.id == comment_id).first()

    if not comment:
        response = jsonify({"error": "Comment couldn't be found"})
        response.status_code = 404
        return response

    if request.method in ["PUT", "DELETE"]:
        if current_user.is_authenticated and comment.user_id == current_user.id:
            pass
        else:
            return jsonify({"error": "Unauthorized access"}), 403

    if request.method == "PUT":
        form = CommentForm(obj=comment)

        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            comment.body = form.body.data
            
            db.session.commit()
            return jsonify({"message": "comment has been updated successfully"}), 200
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
        db.session.delete(comment)
        db.session.commit()
        return jsonify({"message": "Successfully Deleted"})