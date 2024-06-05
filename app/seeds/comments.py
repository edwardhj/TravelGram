from app.models import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_comments():
    newport_c = Comment(
        user_id=2,
        clip_id=4,
        body="It's quite the sunny day at the beach"
        )
    huntington_c = Comment(
        user_id=2,
        clip_id=5,
        body="I love surfing! So jealous of you"
        )
    mammoth_c = Comment(
        user_id=3,
        clip_id=1,
        body="Always trying to catch a blue bird day! No better conditions than this"
        )
    mammoth_c2 = Comment(
        user_id=1,
        clip_id=1,
        body="I would love to learn how to snowboard"
        )
    newport_c2 = Comment(
        user_id=1,
        clip_id=4,
        body="You're so lucky to live by the beach!"
        )
    
    


    db.session.add(newport_c)
    db.session.add(huntington_c)
    db.session.add(mammoth_c)
    db.session.add(mammoth_c2)
    db.session.add(newport_c2)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))
        
    db.session.commit()
