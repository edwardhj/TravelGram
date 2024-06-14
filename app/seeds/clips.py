from app.models import db, Clip, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_clips():
    angel = Clip(
        user_id=7,
        location="Angels Tijuana Tacos",
        video_file="https://traveltok.s3.us-east-2.amazonaws.com/angeltijuana.jpeg",
        caption="The BEST tacos in LA (al pastor & cabeza)",
        )
    athens = Clip(
        user_id=3,
        location="Athens",
        video_file="https://traveltok.s3.us-east-2.amazonaws.com/athensColiseum.jpeg",
        caption="I wish I could have seen the coliseum in its heyday",
        )
    athens2 = Clip(
        user_id=3,
        location="Parthenon",
        video_file="https://traveltok.s3.us-east-2.amazonaws.com/athensParthenon.jpeg",
        caption="Beautiful -- Athena is my favorite goddess",
        )
    augusta = Clip(
        user_id=11,
        location="Augusta Golf Course",
        video_file="https://traveltok.s3.us-east-2.amazonaws.com/augustagolf.jpeg",
        caption="The Masters is the greatest tournament",
        )
    avenue26 = Clip(
        user_id=7,
        location="Avenue 26 Tacos",
        video_file="https://traveltok.s3.us-east-2.amazonaws.com/avenue26.jpeg",
        caption="You gotta love the potatoes",
        )
    badmaash = Clip(
        user_id=10,
        location="Badmaash (Los Angeles)",
        video_file="https://traveltok.s3.us-east-2.amazonaws.com/badmaash.webp",
        caption="Scrumptious, mhm",
        )
    bali = Clip(
        user_id=5,
        location="Bali",
        video_file="https://traveltok.s3.us-east-2.amazonaws.com/bali.webp",
        caption="Bali staying beautiful all year round",
        )
    bb = Clip(
        user_id=2,
        location="Big Bear - Snow Summit",
        video_file="https://traveltok.s3.us-east-2.amazonaws.com/bigbear.jpeg",
        caption="Lots of snow & perfect weather",
        )
    bb2 = Clip(
        user_id=2,
        location="Big Bear - Bear Mountain",
        video_file="https://traveltok.s3.us-east-2.amazonaws.com/bigbear2.jpeg",
        caption="Deep, deep powder today",
        )
    ben = Clip(
        user_id=6,
        location="Big Ben (London)",
        video_file="https://traveltok.s3.us-east-2.amazonaws.com/bigBen.jpeg",
        caption="big ben sure is big",
        )
    bigsky = Clip(
        user_id=2,
        location="Big Sky Ski Resort",
        video_file="https://traveltok.s3.us-east-2.amazonaws.com/bigsky.jpeg",
        caption="Best ski resort in the continental US",
        )
    camphor = Clip(
        user_id=10,
        location="Camphor (Los Angeles)",
        video_file="https://traveltok.s3.us-east-2.amazonaws.com/camphor.jpeg",
        caption="Can't stop munching!",
        )    
    disneyla = Clip(
        user_id=12,
        location="Disneyland Los Angeles",
        video_file="https://traveltok.s3.us-east-2.amazonaws.com/disneylandla.jpeg",
        caption="classic Disneyland :)",
        )
    disneyparis = Clip(
        user_id=12,
        location="Disneyland Paris",
        video_file="https://traveltok.s3.us-east-2.amazonaws.com/disneylandparis.jpeg",
        caption="a theme park of love in the city of love",
        )
    disneytokyo = Clip(
        user_id=12,
        location="Disneyland Tokyo",
        video_file="https://traveltok.s3.us-east-2.amazonaws.com/disneylandtokyo.jpeg",
        caption="my favorite disney resort",
        )
    dumbarton = Clip(
        user_id=9,
        location="Dumbarton Bridge",
        video_file="https://traveltok.s3.us-east-2.amazonaws.com/dumbarton.jpg",
        caption="One of my favorite bridges in the East Coast",
        )
    eatoncanyon = Clip(
        user_id=8,
        location="Eaton Canyon",
        video_file="https://traveltok.s3.us-east-2.amazonaws.com/eatoncanyon.png",
        caption="One of the best hikes near Los Angeles",
        )
    eiffel = Clip(
        user_id=3,
        location="Eiffel Tower (Paris)",
        video_file="https://traveltok.s3.us-east-2.amazonaws.com/eiffelTower.jpeg",
        caption="I'm so single -- I need a girlfriend to enjoy this view with",
        )
    flamin = Clip(
        user_id=7,
        location="El Flamin' Tacos",
        video_file="https://traveltok.s3.us-east-2.amazonaws.com/elflamin'.jpeg",
        caption="The 2nd best al pastor tacos in Los Angeles",
        )
    goldengate = Clip(
        user_id=9,
        location="Golden Gate Bridge (San Francisco)",
        video_file="https://traveltok.s3.us-east-2.amazonaws.com/goldengate.webp",
        caption="The most iconic bridge in the world",
        )
    grandcanyon = Clip(
        user_id=3,
        location="Grand Canyon",
        video_file="https://traveltok.s3.us-east-2.amazonaws.com/grandcanyon.jpeg",
        caption="This view never fails to take my breath",
        )
    griffith = Clip(
        user_id=8,
        location="Griffith Park",
        video_file="https://traveltok.s3.us-east-2.amazonaws.com/griffithpark.jpeg",
        caption="Go on this hike to see all the tourists in LA",
        )
    hermit = Clip(
        user_id=8,
        location="Hermit Falls",
        video_file="https://traveltok.s3.us-east-2.amazonaws.com/hermitfalls.jpg",
        caption="My favorite hike in LA, but it's unfortunately closed due to littering",
        )
    huntington = Clip(
        user_id=5,
        location="Huntington Beach",
        video_file="https://traveltok.s3.us-east-2.amazonaws.com/huntington.jpeg",
        caption="Best waves in Orange County",
        )
    jackson = Clip(
        user_id=2,
        location="Jackson Ski Resort",
        video_file="https://traveltok.s3.us-east-2.amazonaws.com/jackson.webp",
        caption="YAHOOO -- can't stop ripping it",
        )
    mammoth = Clip(
        user_id=2,
        location="Mammoth Ski Resort",
        video_file="https://traveltok.s3.us-east-2.amazonaws.com/mammoth.jpeg",
        caption="I love how it's just a 4 hour drive from LA",
        )
    miami = Clip(
        user_id=4,
        location="Miami",
        video_file="https://traveltok.s3.us-east-2.amazonaws.com/miami.jpeg",
        caption="The city that never stops partying",
        )
    high = Clip(
        user_id=2,
        location="Mountain High Ski Resort",
        video_file="https://traveltok.s3.us-east-2.amazonaws.com/mountainhigh.png",
        caption="Beginners everywhere -- and i'm stunting on them",
        )
    navagio = Clip(
        user_id=5,
        location="Navagio Beach",
        video_file="https://traveltok.s3.us-east-2.amazonaws.com/navagio.jpeg",
        caption="beach #100 visited",
        )
    newport = Clip(
        user_id=5,
        location="Newport Beach",
        video_file="https://traveltok.s3.us-east-2.amazonaws.com/newport.jpeg",
        caption="the beach here smells like peace and wealth",
        )
    nyc = Clip(
        user_id=4,
        location="New York City",
        video_file="https://traveltok.s3.us-east-2.amazonaws.com/nyc.jpeg",
        caption="NYC -- 2020 (in silence)",
        )
    versailles = Clip(
        user_id=3,
        location="Palace of Versailles",
        video_file="https://traveltok.s3.us-east-2.amazonaws.com/PalaceOfVersailles.jpeg",
        caption="Always make sure to block out a day to visit here when in Paris",
        )
    palisades = Clip(
        user_id=2,
        location="Palisades Ski Resort",
        video_file="https://traveltok.s3.us-east-2.amazonaws.com/palisades.jpeg",
        caption="A resort more suited for skiing (lots of flat terrain)",
        )
    parkcity = Clip(
        user_id=2,
        location="Park City Resort",
        video_file="https://traveltok.s3.us-east-2.amazonaws.com/parkcity.jpeg",
        caption="i try to make it out here at least once every other year",
        )
    pebblebeach = Clip(
        user_id=11,
        location="Pebble Beach Golf Course",
        video_file="https://traveltok.s3.us-east-2.amazonaws.com/pebblebeach.jpeg",
        caption="I love golf so much",
        )
    philadelphia = Clip(
        user_id=4,
        location="Philadelphia",
        video_file="https://traveltok.s3.us-east-2.amazonaws.com/philadelphia.jpeg",
        caption="good ol' neighborhood in philly",
        )
    redbird = Clip(
        user_id=10,
        location="Redbird (Los Angeles)",
        video_file="https://traveltok.s3.us-east-2.amazonaws.com/redbird.webp",
        caption="I trust the Michelin Guide so much",
        )
    rome = Clip(
        user_id=3,
        location="Colosseum (Rome)",
        video_file="https://traveltok.s3.us-east-2.amazonaws.com/romeColosseum.jpeg",
        caption="I love Roman lore",
        )
    runyon = Clip(
        user_id=8,
        location="Runyon Canyon",
        video_file="https://traveltok.s3.us-east-2.amazonaws.com/runyoncanyon.jpeg",
        caption="Another classic hike in LA",
        )
    sawa = Clip(
        user_id=10,
        location="Sawa (Los Angeles)",
        video_file="https://traveltok.s3.us-east-2.amazonaws.com/sawa.webp",
        caption="Presentation 10/10, Taste 10/10",
        )
    baybridge = Clip(
        user_id=9,
        location="San Francisco Oakland-Bay Bridge",
        video_file="https://traveltok.s3.us-east-2.amazonaws.com/sfoaklandbay.webp",
        caption="Commuting across this bridge daily adds up in toll fees",
        )
    shibumi = Clip(
        user_id=10,
        location="Shibumi (Los Angeles)",
        video_file="https://traveltok.s3.us-east-2.amazonaws.com/shibumi.webp",
        caption="no words needed",
        )
    steamboat = Clip(
        user_id=2,
        location="Steamboat Ski Resort",
        video_file="https://traveltok.s3.us-east-2.amazonaws.com/steamboat.jpeg",
        caption="Always have good powder and conditions here",
        )
    sunset = Clip(
        user_id=5,
        location="Sunset Beach",
        video_file="https://traveltok.s3.us-east-2.amazonaws.com/sunset.jpg",
        caption="Local, quiet beach -- 9.5/10",
        )
    takeda = Clip(
        user_id=10,
        location="Sushi Takeda (Los Angeles)",
        video_file="https://traveltok.s3.us-east-2.amazonaws.com/sushitakeda.jpeg",
        caption="My favorite sushi spot in the city",
        )
    torrey = Clip(
        user_id=11,
        location="Torrey Pines",
        video_file="https://traveltok.s3.us-east-2.amazonaws.com/torreypines.webp",
        caption="This course is incredibly difficult to score on",
        )
    vali = Clip(
        user_id=2,
        location="Vali Ski Resort",
        video_file="https://traveltok.s3.us-east-2.amazonaws.com/vali.jpeg",
        caption="LOOK AT ME SHRED YAHOOO",
        )
    wilacre = Clip(
        user_id=8,
        location="Wilacre Park",
        video_file="https://traveltok.s3.us-east-2.amazonaws.com/wilacre+park.jpeg",
        caption="A nice hike with lots of shade",
        )
    yellowstone = Clip(
        user_id=6,
        location="Yellowstone National Park",
        video_file="https://traveltok.s3.us-east-2.amazonaws.com/yellowstone.jpeg",
        caption="watch out! ground might erupt",
        )
    yosemite = Clip(
        user_id=4,
        location="Yosemite National Park",
        video_file="https://traveltok.s3.us-east-2.amazonaws.com/yosemite.jpeg",
        caption="Lovely views & iconic",
        )
    yosemite2 = Clip(
        user_id=4,
        location="Yosemite National Park",
        video_file="https://traveltok.s3.us-east-2.amazonaws.com/yosemite2.jpeg",
        caption="One yosemite post isn't enough -- i had to post a second",
        )
    yunomi = Clip(
        user_id=19,
        location="Yunomi Handroll (Los Angeles)",
        video_file="https://traveltok.s3.us-east-2.amazonaws.com/yunomihandroll.webp",
        caption="yummy handrolls",
        )
    zion = Clip(
        user_id=4,
        location="Zion Canyon",
        video_file="https://traveltok.s3.us-east-2.amazonaws.com/zion.jpeg",
        caption="Underrated canyon",
        )


    db.session.add(angel)
    db.session.add(athens)
    db.session.add(athens2)
    db.session.add(augusta)
    db.session.add(disneytokyo)
    db.session.add(avenue26)
    db.session.add(badmaash)
    db.session.add(bali)
    db.session.add(bb)
    db.session.add(bb2)
    db.session.add(disneyparis)
    db.session.add(ben)
    db.session.add(bigsky)
    db.session.add(camphor)
    db.session.add(dumbarton)
    db.session.add(eatoncanyon)
    db.session.add(eiffel)
    db.session.add(flamin)
    db.session.add(goldengate)    
    db.session.add(disneyla)
    db.session.add(grandcanyon)
    db.session.add(griffith)
    db.session.add(hermit)
    db.session.add(huntington)
    db.session.add(jackson)
    db.session.add(mammoth)
    db.session.add(miami)
    db.session.add(high)
    db.session.add(navagio)
    db.session.add(newport)
    db.session.add(nyc)
    db.session.add(versailles)
    db.session.add(palisades)
    db.session.add(parkcity)
    db.session.add(pebblebeach)
    db.session.add(philadelphia)    
    db.session.add(redbird)    
    db.session.add(rome)
    db.session.add(runyon)
    db.session.add(sawa)
    db.session.add(baybridge)
    db.session.add(shibumi)
    db.session.add(steamboat)
    db.session.add(sunset)
    db.session.add(takeda)
    db.session.add(torrey)
    db.session.add(vali)
    db.session.add(wilacre)
    db.session.add(yellowstone)
    db.session.add(yosemite)
    db.session.add(yosemite2)
    db.session.add(yunomi)
    db.session.add(zion)

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
