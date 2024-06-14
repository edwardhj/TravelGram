from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        first_name="Demo", 
        last_name="User", 
        email='demo@email.com', 
        username='citydemo', 
        password='password',
        is_admin=False)
    Edward = User(
        first_name="Edward", 
        last_name="Jung", 
        email='edward@gmail.com', 
        username='snowshredder', 
        password='password',
        profile_pic='https://traveltok.s3.us-east-2.amazonaws.com/pp1.jpeg',
        is_admin=True)
    Nathan = User(
        first_name="Nathan", 
        last_name="Smith", 
        email='natty@gmail.com', 
        username='worldtraveler', 
        password='password',
        profile_pic='https://traveltok.s3.us-east-2.amazonaws.com/pp2.jpeg',
        is_admin=False)
    Jasmine = User(
        first_name="Jasmine", 
        last_name="Hernandez", 
        email='jasmine@gmail.com', 
        username='jsunsets', 
        password='password',
        profile_pic='https://traveltok.s3.us-east-2.amazonaws.com/pp2.jpeg',
        is_admin=False)
    Emma = User(
        first_name="Emma", 
        last_name="Chamberlain", 
        email='emma@gmail.com', 
        username='emmywinner', 
        password='password',
        profile_pic='https://traveltok.s3.us-east-2.amazonaws.com/pp12.jpeg',
        is_admin=False)
    Jennie = User(
        first_name="Jennie", 
        last_name="Lee", 
        email='jennie@gmail.com', 
        username='jsmiles', 
        password='password',
        profile_pic='https://traveltok.s3.us-east-2.amazonaws.com/pp13.jpeg',
        is_admin=False)
    Melody = User(
        first_name="Melody", 
        last_name="Nguyen", 
        email='melody@gmail.com', 
        username='mlovestacos', 
        password='password',
        profile_pic='https://traveltok.s3.us-east-2.amazonaws.com/pp4.jpeg',
        is_admin=False)
    Anna = User(
        first_name="Anna", 
        last_name="Park", 
        email='anna@gmail.com', 
        username='annaeats', 
        password='password',
        profile_pic='https://traveltok.s3.us-east-2.amazonaws.com/pp5.jpeg',
        is_admin=False)
    Parker = User(
        first_name="Parker", 
        last_name="Kingsbury", 
        email='parker@gmail.com', 
        username='bogeygolfer', 
        password='password',
        profile_pic='https://traveltok.s3.us-east-2.amazonaws.com/pp6.jpeg',
        is_admin=False)
    Ashley = User(
        first_name="Ashley", 
        last_name="Diehl", 
        email='ashley@gmail.com', 
        username='disneyadult', 
        password='password',
        profile_pic='https://traveltok.s3.us-east-2.amazonaws.com/pp14.jpeg',
        is_admin=False)
    Bradley = User(
        first_name="Bradley", 
        last_name="Johnson", 
        email='bradley@gmail.com', 
        username='bradhikes', 
        password='password',
        profile_pic='https://traveltok.s3.us-east-2.amazonaws.com/pp10.jpeg',
        is_admin=False)
    Dave = User(
        first_name="Dave", 
        last_name="Anderson", 
        email='dave@gmail.com', 
        username='davenbridges', 
        password='password',
        profile_pic='https://traveltok.s3.us-east-2.amazonaws.com/pp7.jpeg',
        is_admin=False)    

    db.session.add(demo)
    db.session.add(Edward)
    db.session.add(Nathan)
    db.session.add(Jasmine)
    db.session.add(Emma)
    db.session.add(Jennie)
    db.session.add(Melody)
    db.session.add(Bradley)
    db.session.add(Dave)
    db.session.add(Anna)
    db.session.add(Parker)
    db.session.add(Ashley)    
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
