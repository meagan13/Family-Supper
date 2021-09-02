from .db import db

class Direction(db.Model):
    __tablename__ = 'directions'

    id = db.Column(db.Integer, primary_key=True)
    step_number = db.Column(db.Integer)
    instruction = db.Column(db.Text, nullable=False)
    recipe_id = db.Column(db.Integer, db.ForeignKey("recipes.id"), nullable=False)

    recipe = db.relationship("Recipe", back_populates="directions")

    def to_dict(self):
        return {
            'id': self.id,
            'step_number': self.step_number,
            'recipe_id': self.recipe_id,
            'instruction': self.instruction,
        }
