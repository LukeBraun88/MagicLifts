from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField
from wtforms.validators import DataRequired, ValidationError, Length

from app.models import Lift

def lift_exists(form, field):
    title = field.data

    not_unique = Lift.query.filter(
        Lift.title == title).first()

    if not_unique:
        raise ValidationError(
            f'You already have a {title} lift'
        )


class LiftForm(FlaskForm):
    title = StringField('title', validators=[DataRequired(), lift_exists, Length(max=50, message="title must be less than %(max)d characters long")])
    description = StringField('description', validators=[DataRequired(), Length(max=255, message="description must be less than %(max)d characters long")])
    body_part = SelectField('body part', choices=['Shoulders', 'Abs', 'Arms', 'Chest', 'Back', 'Legs'], validators=[DataRequired()])
