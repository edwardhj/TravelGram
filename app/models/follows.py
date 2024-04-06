from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

Follow = db.Table('follows',
    db.Model.metadata,
    db.Column('following_user_id', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'), ondelete='CASCADE'), nullable=False),
    db.Column('follower_user_id', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'), ondelete='CASCADE'), nullable=False),
    db.Column('is_close_friend', db.Boolean, default=False),
    db.Column('created_at', db.DateTime, default=datetime.utcnow),
    db.Column('updated_at', db.DateTime, default=datetime.utcnow)
)

if environment == "production":
    Follow.schema = SCHEMA