from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Clip(db.Model):
    __tablename__ = 'clips'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'), ondelete='CASCADE'), nullable=False)
    location = db.Column(db.String(60), nullable=False)
    video_file = db.Column(db.String(255), nullable=False)
    caption = db.Column(db.Text)
    is_private = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = db.relationship('User', backref='clips')
    comments = db.relationship('Comment', backref='clip', cascade="all, delete")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'location': self.location,
            'video_file': self.video_file,
            'caption': self.caption,
            'is_private': self.is_private
        }
