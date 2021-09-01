from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    imgUrl = db.Column(db.String)
    bio = db.Column(db.String(500))
    password = db.Column(db.String(255), nullable=False)

    recipes = db.relationship("Recipe", back_populates="user")
    memories = db.relationship("Memory", back_populates="user")

    @property
    def password(self):
        return self.password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'imgUrl': self.imgUrl,
            'bio': self.bio,
            'password': self.password
        }
