from flask_wtf import FlaskForm
from wtforms.fields import StringField, IntegerField, SubmitField, BooleanField
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms.validators import DataRequired
# from app.api.aws import ALLOWED_MUSIC_EXTENSIONS

class ClipForm(FlaskForm):
    location = StringField("Location", validators=[DataRequired()])
    caption = StringField("Caption")
    is_private = BooleanField('private')
    file = StringField("Will update to filefield & modify the allowed file types", validators=[DataRequired()]) 
                    #    ,validators=[FileRequired(), FileAllowed(list(ALLOWED_MUSIC_EXTENSIONS))])
    submit = SubmitField("Submit")
