from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from sqlalchemy.orm import relationship


class Clip(db.Model):
    __tablename__ = 'clips'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'), ondelete='CASCADE'), nullable=False)
    location = db.Column(db.String(60), nullable=False)
    video_file = db.Column(db.String(255), nullable=False)
    caption = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    uploader = relationship('User', back_populates='uploaded_clips')
    comments_on_clip = relationship('Comment', back_populates='clip_comment', cascade="all, delete")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'location': self.location,
            'video_file': self.video_file,
            'caption': self.caption,
            'created_at': self.created_at,
            'updated_at': self.updated_at.strftime('%B %d')
        }