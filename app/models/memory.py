from .db import db

class Memory(db.Model):
    __tablename__ = 'memories'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    memory_text = db.Column(db.String(350), nullable=False)
    recipe_id = db.Column(db.Integer, db.ForeignKey("recipes.id"), nullable=False)
    created_at = db.Column(db.DateTime)
    updated_at = db.Column(db.DateTime)

    # memories
    recipe = db.relationship("Recipe", back_populates="memories")
    user = db.relationship("User", back_populates="memories")
