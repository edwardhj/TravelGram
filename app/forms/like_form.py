from flask_wtf import FlaskForm
from wtforms.fields import SubmitField, StringField, BooleanField
from wtforms.validators import DataRequired, EqualTo
from werkzeug.security import check_password_hash

class LikeForm(FlaskForm):
    is_like = BooleanField("Like", validators=[DataRequired()])
    submit = SubmitField("Submit")
