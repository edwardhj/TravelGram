from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        first_name="Demo", 
        last_name="User", 
        email='demo@email.com', 
        username='Demo', 
        password='password',
        is_admin=False)
    Edward = User(
        first_name="Edward", 
        last_name="Jung", 
        email='edward@gmail.com', 
        username='edwardhj', 
        password='password',
        profile_pic='https://traveltok.s3.us-east-2.amazonaws.com/pp1.jpeg',
        is_admin=True)
    Nathan = User(
        first_name="Nate", 
        last_name="Suh", 
        email='natty@gmail.com', 
        username='natedawg', 
        password='password',
        profile_pic='https://traveltok.s3.us-east-2.amazonaws.com/pp2.jpeg',
        is_admin=False)

    db.session.add(demo)
    db.session.add(Edward)
    db.session.add(Nathan)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
        
    db.session.commit()
