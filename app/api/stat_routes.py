from flask import Blueprint, session, request
from flask_login import login_required, current_user

from app.models import db, Stat, Lift
from app.forms.stat_form import StatForm

stat_routes = Blueprint('stats', __name__)

# ----------------------------------CREATE NEW STAT--------------------------------
@stat_routes.route('', methods=['POST'])
@login_required
def new_stat():
    # 1. Get user from session
    user = current_user

    # 2. Prepare form data for validation
    form = StatForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    lift_id = request.json['lift_id']


    # 3. Validate form data; if invalid return 400 bad request to user
    if not form.validate_on_submit():
        return {"message": "validation_errors", "data": form.errors}, 400

    # 4. If valid then extract useful data from form
    sets = form.data['sets']
    reps = form.data['reps']
    weight = form.data['weight']
    date = form.data['date']
    difficulty = form.data['difficulty']
    notes = form.data['notes']

    # 5. Create the stat
    stat = Stat(sets=sets,
                reps=reps, weight=weight,
                date=date, difficulty=difficulty,
                notes=notes, lift_id=lift_id)

    # 6. Add and commit the stat
    db.session.add(stat)
    db.session.commit()

    lift = Lift.query.get(lift_id)

    # 7. Send 201 response to the user
    return {"message": "success", "data": lift.to_dict()}, 201


# -------------------------------READ STATS FOR CURRENT USER--------------------------
@stat_routes.route('', methods=['GET'])
@login_required
def get_stats():
    # 1. gets user from session
    user = current_user

    # 2. finds stats based off of user.id
    user_stats = Stat.query.filter(
        Stat.user_id == user.id)

    # 3. returns users stats
    return {"message": "success", "data": [stat.to_dict() for stat in user_stats]}, 200


# UPDATE STAT
@stat_routes.route('/<int:id>', methods=['PATCH'])
@login_required
def update_stat(id):

    # 1. creates form, adds csrf token
    form = StatForm()
    # print(form,"form------------")
    form['csrf_token'].data = request.cookies['csrf_token']

    # 2. find stat by id and add month and year to form
    stat = Stat.query.get(id)

    # 3. Validate form data; if invalid return 400 bad request to user
    if not form.validate_on_submit():
        return {"message": "validation_errors", "data": form.errors}, 400


    # 4. update stat commit changes to database
    print("stat---", form.data['sets'])
    print("date---", form.data['date'])
    stat.sets = form.data['sets']
    stat.reps = form.data['reps']
    stat.weight = form.data['weight']
    stat.date = form.data['date']
    stat.difficulty = form.data['difficulty']
    stat.notes = form.data['notes']
    db.session.commit()

    lift = Lift.query.get(stat.lift_id)

    # 5. Return message with updated stat and a 201 response
    return {"message": "success", "data": lift.to_dict()}, 201


# DELETE SPECIFIED STAT
@stat_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_stat(id):
    # 1. Find stat by id
    stat = Stat.query.get(id)
    data = stat.to_dict()
    # 2. if stat exists, delete and commit, else return msg
    if stat:
        db.session.delete(stat)
        db.session.commit()
        return {"message": " stat was successfully deleted", "data": data}, 200
    else:
        return {"message": "stat does not exist"}, 404
