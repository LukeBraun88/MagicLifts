from flask import Blueprint, session, request
from flask_login import login_required, current_user

from app.models import db, Lift, BodyPart
# from app.forms.lift_form import LiftForm, LiftForm

body_part_routes = Blueprint('body_parts', __name__)


@body_part_routes.route('/<int:id>', methods=['GET'])
@login_required
def get_body_part_by_id(id):
    # 1. gets user from session
    user = current_user

    # 2. finds lifts based off of user.id
    current_lifts = Lift.query.filter(
        Lift.body_part_id == id)

    # 3. returns users lifts
    return {"message": "success", "data": [lift.to_dict() for lift in current_lifts]}, 200
