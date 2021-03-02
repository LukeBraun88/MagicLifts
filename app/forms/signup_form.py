from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    print("Checking if user exits", field.data)
    email = field.data
    username = form.data['username']
    user_email = User.query.filter(User.email == email).first()
    user_username = User.query.filter(User.username == username).first()
    if user_email or user_username:
        raise ValidationError("User is already registered.")


class SignUpForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    username = StringField('username', validators=[DataRequired()])
    email = StringField('email', validators=[DataRequired(), user_exists, Email(message="not a valid email address")])
    password = StringField('password', validators=[DataRequired()])
