from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, FileField
from wtforms.validators import DataRequired
from flask_wtf.file import FileField, FileAllowed
from app.api.aws import ALLOWED_IMG_EXTENSIONS


class EditProfileForm(FlaskForm):
    first_name = StringField('First Name', validators=[DataRequired()])
    last_name = StringField('Last Name', validators=[DataRequired()])
    profile_pic = FileField("Profile Picture", validators=[FileAllowed(list(ALLOWED_IMG_EXTENSIONS))])
    submit = SubmitField('Update Profile')
