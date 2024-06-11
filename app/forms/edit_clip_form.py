from flask_wtf import FlaskForm
from wtforms.fields import StringField, SubmitField
from wtforms.validators import DataRequired

class EditClipForm(FlaskForm):
    location = StringField("Location", validators=[DataRequired()])
    caption = StringField("Caption")
    submit = SubmitField("Submit")
