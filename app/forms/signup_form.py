from flask_wtf import FlaskForm
from wtforms import StringField
# from wtforms.fields.simple import TextAreaField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')

def email_format(form, field):
    email = field.data
    if email:
        raise Email('Please enter a valid email.')

def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists])
    email = StringField('email', validators=[DataRequired(), user_exists])
    imgUrl = StringField('imgUrl')
    bio = StringField('bio')
    password = StringField('password', validators=[DataRequired()])
