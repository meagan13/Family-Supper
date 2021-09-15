from flask import Blueprint, request
from app.models import Category, db

categories_route = Blueprint('categories', __name__)

@categories_route.route('/')
def categories():
    categories = Category.query.all()
    return {'categories': [category.to_dict() for category in categories]}
