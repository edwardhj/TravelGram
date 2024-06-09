from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, FileField
from wtforms.validators import DataRequired, Email, ValidationError, EqualTo
from flask_wtf.file import FileField, FileAllowed
from app.api.aws import ALLOWED_IMG_EXTENSIONS
from app.models import User


def user_exists(form, field):
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use')

def username_exists(form, field):
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use')


class SignUpForm(FlaskForm):
    first_name = StringField('First Name', validators=[DataRequired()])
    last_name = StringField('Last Name', validators=[DataRequired()])
    username = StringField('Username', validators=[DataRequired(), username_exists])
    email = StringField('Email', validators=[DataRequired(), Email(), user_exists])
    password = PasswordField('Password', validators=[DataRequired()])
    # confirm_password = PasswordField('Confirm Password', validators=[EqualTo('password', message='Passwords must match')])
    profile_pic = FileField("Profile Picture", validators=[FileAllowed(list(ALLOWED_IMG_EXTENSIONS))])
    submit = SubmitField('Sign Up')
