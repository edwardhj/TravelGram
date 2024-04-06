from .db import db, environment, SCHEMA, add_prefix_for_prod

Like = db.Table('likes',
    db.Model.metadata,
    db.Column('user_id', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'), ondelete='CASCADE'), nullable=False),
    db.Column('clip_id', db.Integer, db.ForeignKey(add_prefix_for_prod('clips.id'), ondelete='CASCADE'), nullable=False),
    db.Column('is_like', db.Boolean, default=True)
)

if environment == "production":
    Like.schema = SCHEMA