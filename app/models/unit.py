from .db import db

class Unit(db.Model):
    __tablename__ = 'units'

    id = db.Column(db.Integer, primary_key=True)
    unit_name = db.Column(db.String)

    ingredients = db.relationship("Ingredient", back_populates="units")

    def to_dict(self):
        return {
            'id': self.id,
            'unit_name': self.unit_name,
        }