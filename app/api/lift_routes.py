from flask import Blueprint, session, request
from flask_login import login_required, current_user

from app.models import db, Lift
from app.forms.lift_form import LiftForm, LiftForm

lift_routes = Blueprint('lifts', __name__)


# CREATE NEW LIFT
@lift_routes.route('', methods=['POST'])
@login_required
def new_lift():
    # 1. Get user from session
    user = current_user

    # 2. Prepare form data for validation
    form = LiftForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    # 3. Validate form data; if invalid return 400 bad request to user
    if not form.validate_on_submit():
        return {"message": "validation_errors", "data": form.errors}, 400

    # 4. If valid then extract useful data from form
    title = form.data['title']
    description = form.data['description']
    body_part = form.data['body_part']

    # 5. Create the lift
    lift = Lift(user_id=user.id, title=title,
                        description=description, body_part=body_part)

    # 6. Add and commit the lift
    db.session.add(lift)
    db.session.commit()

    # 7. Send 201 response to the user
    return {"message": "success", "data": lift.to_dict()}, 201


# READ LIFTS FOR CURRENT USER
@lift_routes.route('', methods=['GET'])
@login_required
def get_lifts():
    # 1. gets user from session
    user = current_user

    # 2. finds lifts based off of user.id
    user_lifts = Lift.query.filter(
        Lift.user_id == user.id)

    # 3. returns users lifts
    return {"message": "success", "data": [lift.to_dict() for lift in user_lifts]}, 200


# UPDATE LIFT
@lift_routes.route('/<int:id>', methods=['PATCH'])
@login_required
def update_lift(id):

    # 1. creates form, adds csrf token
    form = LiftForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    # 2. find lift by id and add body part
    lift = Lift.query.get(id)
    form['body_part'].data = lift.body_part

    # 3. Validate form data; if invalid return 400 bad request to user
    if not form.validate_on_submit():
        return {"message": "validation_errors", "data": form.errors}, 400

    # 4. If valid then extract title form
    title = form.data['title']
    description = form.data['description']

    # 5. update lift title and commit changes to database
    lift.title = title
    lift.description = description
    db.session.commit()

    # 6. Return message with updated lift and a 201 response
    return {"message": "success", "data": lift.to_dict()}, 201


# DELETE SPECIFIED LIFT
@lift_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_lift(id):
    # 1. Find lift by id
    lift = Lift.query.get(id)
    liftId = lift.id
    # 2. if lift exists, delete and commit, else return msg
    if lift:
        db.session.delete(lift)
        db.session.commit()
        return {"message": " lift was successfully deleted", "data": liftId}, 200
    else:
        return {"message": "lift does not exist"}, 404
