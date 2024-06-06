from app.models import db, Clip, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_clips():
    mammoth = Clip(
        user_id=2,
        location="Mammoth Mountain Resort",
        video_file="https://traveltok.s3.us-east-2.amazonaws.com/powder_mammmoth.jpeg",
        caption="A beautiful blue bird day to snowboard",
        is_private=False
        )
    big_bear = Clip(
        user_id=2,
        location="Snow Summit",
        video_file="https://traveltok.s3.us-east-2.amazonaws.com/bb_blue_bird.jpeg",
        caption="Lots of snow & perfect weather",
        is_private=True
        )
    palisades = Clip(
        user_id=2,
        location="Palisades Ski Reosrt",
        video_file="https://traveltok.s3.us-east-2.amazonaws.com/palisades.jpeg",
        caption="Deep, deep powder today",
        is_private=False
        )
    newport = Clip(
        user_id=3,
        location="Newport Beach",
        video_file="https://traveltok.s3.us-east-2.amazonaws.com/newport.jpeg",
        caption="Lovely weather to tan at the beach",
        is_private=False
        )
    huntington = Clip(
        user_id=3,
        location="Huntington Beach",
        video_file="https://traveltok.s3.us-east-2.amazonaws.com/huntington.jpeg",
        caption="Good waves to surf",
        is_private=False
        )
    sunset = Clip(
        user_id=3,
        location="Sunset Beach",
        video_file="https://traveltok.s3.us-east-2.amazonaws.com/sunset.jpg",
        caption="Beautiful sunset at the beach",
        is_private=False
        )

    db.session.add(mammoth)
    db.session.add(big_bear)
    db.session.add(palisades)
    db.session.add(newport)
    db.session.add(huntington)
    db.session.add(sunset)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_clips():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.clips RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM clips"))
        
    db.session.commit()
