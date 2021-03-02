from .db import db


class Stat(db.Model):
    __tablename__ = 'stats'

    id = db.Column(db.Integer, primary_key=True)
    sets = db.Column(db.Integer, nullable=False)
    reps = db.Column(db.Integer, nullable=False)
    weight = db.Column(db.Integer, nullable=False)
    date = db.Column(db.Date, nullable=False)
    difficulty = db.Column(db.String, nullable=False)
    notes = db.Column(db.String(255), nullable=False)
    lift_id = db.Column(db.Integer, db.ForeignKey('lifts.id'), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now())


    def to_dict(self):
        return {
            "id": self.id,
            "sets": self.sets,
            "reps": self.reps,
            "date": self.date,
            "difficulty": self.difficulty,
            "notes": self.notes,
            "liftId": self.lift_id,
            "createdAt": self.created_at,
            "updatedAt": self.updated_at,
        }
