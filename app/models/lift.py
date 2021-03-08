from .db import db


class Lift(db.Model):
    __tablename__ = 'lifts'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(255))
    body_part_id = db.Column(db.Integer, db.ForeignKey('body_parts.id'), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now())

    _stats = db.relationship(
        "Stat", backref="lifts", cascade="all, delete-orphan")

    @property
    def stats(self):
        return [x.to_dict() for x in self._stats]

    @property
    def graph_stats(self):
        return [x.to_graph() for x in self._stats]

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "bodyPartId": self.body_part_id,
            "stats": self.stats,
            "createdAt": self.created_at,
            "updatedAt": self.updated_at,
        }

    def to_graph(self):
        return {
            "id": self.title,
            "color": "example",
            "data": self.graph_stats
        }
