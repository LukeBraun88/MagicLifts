from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField, DateField
from wtforms.validators import DataRequired, ValidationError, Length
from app.models import Stat


class StatForm(FlaskForm):
    sets = IntegerField('sets', validators=[DataRequired()])
    reps = IntegerField('reps', validators=[DataRequired()])
    weight = IntegerField('weight', validators=[DataRequired()])
    date = DateField('date', validators=[DataRequired()])
    difficulty = SelectField('difficulty', choices=['easy', 'medium', 'hard'], validators=[DataRequired()])
    notes = StringField('notes', validators=[Length(max=255, message="notes must be less than %(max)d characters long")])
