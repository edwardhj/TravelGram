from flask_wtf import FlaskForm
from wtforms.fields import StringField, SubmitField, BooleanField
from wtforms.validators import DataRequired

class EditClipForm(FlaskForm):
    location = StringField("Location", validators=[DataRequired()])
    caption = StringField("Caption")
    is_private = BooleanField('private')
    submit = SubmitField("Submit")
