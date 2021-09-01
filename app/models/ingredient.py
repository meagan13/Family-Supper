from .db import db

class Ingredient(db.Model):
    __tablename__ = "ingredients"

    id = db.Column(db.Integer, primary_key=True)
    amt = db.Column(db.Float)
    measurement = db.Column(db.String)
    ingredient_name = db.Column(db.String, nullable=False)
    recipe_id = db.Column(db.Integer, db.ForeignKey("recipes.id"), nullable=False)

    recipes = db.relationship("Recipe", back_populates="ingredients")

    def to_dict(self):
        return {
            'id': self.id,
            'amt': self.amt,
            'measurement': self.measurement,
            'ingredient_name': self.ingredient_name,
            'recipe_id': self.recipe_id,
        }

    # def get_recipe_ingredients(self) {
    #     return self.recipe_id.
    # }
