from .db import db

class Recipe(db.Model):
    __tablename__ = 'recipes'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    author = db.Column(db.String, nullable=False)
    description = db.Column(db.Text)
    food_img = db.Column(db.String, nullable=False)
    card_img = db.Column(db.String, nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey("categories.id"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    memories = db.relationship("Memory", back_populates="recipe")
    user = db.relationship("User", back_populates="recipes")
    category = db.relationship("Category", back_populates="recipe")
    ingredients = db.relationship("Ingredient", back_populates="recipes")
    directions = db.relationship("Direction", back_populates="recipe")
