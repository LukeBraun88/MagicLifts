from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

class User(db.Model, UserMixin):
  __tablename__ = 'users'

  id = db.Column(db.Integer, primary_key = True)
  name = db.Column(db.String(40), nullable = False)
  username = db.Column(db.String(40), nullable = False, unique = True)
  email = db.Column(db.String(255), nullable = False, unique = True)
  hashed_password = db.Column(db.String(255), nullable = False)
  created_at = db.Column(db.DateTime, server_default=db.func.now())
  updated_at = db.Column(db.DateTime, server_default=db.func.now())

  _lifts = db.relationship(
        "Lift", backref="users", cascade="all, delete-orphan")

  @property
  def password(self):
    return self.hashed_password


  @password.setter
  def password(self, password):
    self.hashed_password = generate_password_hash(password)


  def check_password(self, password):
    return check_password_hash(self.password, password)

  @property
  def lifts(self):
      return [x.to_dict() for x in self._lifts]

  def to_dict(self):
    return {
      "id": self.id,
      "username": self.username,
      "name": self.name,
      "lifts":self.lifts,
      "email": self.email
    }
