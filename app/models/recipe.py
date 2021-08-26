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

    memories = db.relationship("Memory", back_populates="recipe", cascade="all, delete-orphan")
    user = db.relationship("User", back_populates="recipes")
    category = db.relationship("Category", back_populates="recipe")
    ingredients = db.relationship("Ingredient", back_populates="recipes", cascade="all, delete-orphan")
    directions = db.relationship("Direction", back_populates="recipe", cascade="all, delete-orphan")

    # not built-in
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'author': self.author,
            'description': self.description,
            'food_img': self.food_img,
            'card_img': self.card_img,
            'category_id': self.category_id,
            'user_id': self.user_id,
            'memories': [memory.to_dict() for memory in self.memories], #keys
            'ingredients': [ingredient.to_dict() for ingredient in self.ingredients],
            'directions': [direction.to_dict() for direction in self.directions]
        }
    def recipe_memories(self):
        return {
            'id': self.id,
            'title': self.title,
            'author': self.author,
            'description': self.description,
            'food_img': self.food_img,
            'card_img': self.card_img,
            'category_id': self.category_id,
            'user_id': self.user_id,
        }
