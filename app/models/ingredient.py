from .db import db

class Ingredient(db.Model):
    __tablename__ = "ingredients"

    id = db.Column(db.Integer, primary_key=True)
    amt = db.Column(db.Integer)
    measurement_id = db.Column(db.Integer, db.ForeignKey("units.id"))
    ingredient_name = db.Column(db.String, nullable=False)
    recipe_id = db.Column(db.Integer, db.ForeignKey("recipes.id"), nullable=False)

    units = db.relationship("Unit", back_populates="ingredients")
    recipes = db.relationship("Recipe", back_populates="ingredients")
