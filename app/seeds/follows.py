from app.models import db, Follow, environment, SCHEMA
from sqlalchemy.sql import text, insert


# Adds a demo user, you can add other users here if you want
def seed_follows():
    follows = [
        {"following_user_id": 2, "follower_user_id": 1, "is_close_friend": False},
        {"following_user_id": 3, "follower_user_id": 1, "is_close_friend": False},
        {"following_user_id": 2, "follower_user_id": 3, "is_close_friend": False},
        {"following_user_id": 3, "follower_user_id": 2, "is_close_friend": False},
    ]

    db.session.execute(insert(Follow), follows)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_follows():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.follows RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM follows"))
        
    db.session.commit()
