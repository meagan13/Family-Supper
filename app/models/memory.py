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

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'memory_text': self.memory_text,
            'recipe_id': self.recipe_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }
