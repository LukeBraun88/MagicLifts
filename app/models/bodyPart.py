from .db import db


class BodyPart(db.Model):
    __tablename__ = 'body_parts'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now())

    _lifts = db.relationship(
        "Lift", backref="body_parts", cascade="all, delete-orphan")

    @property
    def lifts(self):
        return [x.to_dict() for x in self._lifts]

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "lifts": self.lifts,
            "userId": self.user_id,
            # "createdAt": self.created_at,
            # "updatedAt": self.updated_at,
        }
