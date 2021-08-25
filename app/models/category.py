from .db import db

class Category(db.Model):
    __tablename__ = 'categories'

    id = db.Column(db.Integer, primary_key=True)
    cat_name = db.Column(db.String, nullable=False)

    recipe = db.relationship("Recipe", back_populates="category")

    def to_dict(self):
        return {
            'id': self.id,
            'cat_name': self.cat_name,
        }
