from flask_wtf import FlaskForm
from wtforms.fields import StringField, TextAreaField, SubmitField, BooleanField
from wtforms.validators import DataRequired, Length

class CommentForm(FlaskForm):
    body = TextAreaField("Comment", validators=[DataRequired(), Length(max=500)])
    submit = SubmitField("Submit")
