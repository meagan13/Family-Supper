from .db import db

class Direction(db.Model):
    __tablename__ = 'directions'

    id = db.Column(db.Integer, primary_key=True)
    step_number = db.Column(db.Integer, nullable=False)
    recipe_id = db.Column(db.Integer, db.ForeignKey("recipes.id"), nullable=False)
    instruction = db.Column(db.String(50), nullable=False)

    recipe = db.relationship("Recipe", back_populates="directions")
