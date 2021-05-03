from flask import Blueprint, jsonify, session, request
from app.models import User, bodyPart, db, Lift, BodyPart
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required

auth_routes = Blueprint('auth', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field} : {error}")
    return errorMessages


@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {'errors': ['Unauthorized']}, 401


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    print(request.get_json())
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data['email']).first()
        login_user(user)

        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User(
            name=form.data['name'],
            username=form.data['username'],
            email=form.data['email'],
            password=form.data['password']
        )
        db.session.add(user)
        db.session.commit()

        bodyPart1 = BodyPart(title='Shoulders', user_id=user.id)
        bodyPart2 = BodyPart(title='Back', user_id=user.id)
        bodyPart3 = BodyPart(title='Arms', user_id=user.id)
        bodyPart4 = BodyPart(title='Chest', user_id=user.id)
        bodyPart5 = BodyPart(title='Legs', user_id=user.id)
        bodyPart6 = BodyPart(title='Abs', user_id=user.id)
        db.session.add_all(
            [bodyPart1, bodyPart2, bodyPart3, bodyPart4, bodyPart5, bodyPart6])
        db.session.commit()

        lift1 = Lift(title="Shoulder Press",
                     description="Sit on upright bench with dumbbells at shoulder height. Press weights upwards", body_part_id=bodyPart1.id)
        lift2 = Lift(title="Deadlift",
                     description="Stand with mid-foot under barbell. Grab bar, bend knees, straighten back and stand up with weight", body_part_id=bodyPart2.id)
        lift3 = Lift(title="Seated Bicep Curls",
                     description="Sit in incline bench with dumbbells at your sides. Contract biceps and bend your elbows to bring the weights shoulder height", body_part_id=bodyPart3.id)
        lift4 = Lift(title="Bench Press",
                     description="Lie on flat bench. Straighten you arms to un-rack bar. Bring bar down to mid-chest and press upwards", body_part_id=bodyPart4.id)
        lift5 = Lift(title="Leg Press",
                     description="Sit back in bench with head supported and feet shoulder-width apart. Press footplate forward", body_part_id=bodyPart5.id)
        lift6 = Lift(title="Sit-Ups",
                     description="Lie down on back with knees bent. Contract abs and sit up", body_part_id=bodyPart6.id)
        db.session.add_all(
            [lift1, lift2, lift3, lift4, lift5, lift6])
        db.session.commit()

        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}


@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': ['Unauthorized']}, 401
