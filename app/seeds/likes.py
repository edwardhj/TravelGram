from app.models import db, Like, environment, SCHEMA
from sqlalchemy.sql import text, insert


# Adds a demo user, you can add other users here if you want
def seed_likes():
    likes = [
        {"user_id": 1, "clip_id": 1, "is_like": True},
        {"user_id": 2, "clip_id": 4, "is_like": True},
        {"user_id": 2, "clip_id": 4, "is_like": True},
        {"user_id": 1, "clip_id": 2, "is_like": False}
    ]

    db.session.execute(insert(Like), likes)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_likes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.likes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM likes"))
        
    db.session.commit()
