from flask import Blueprint
from app.models import Recipe

recipe_route = Blueprint('recipe', __name__)

@recipe_route.route('/')
def recipes():
    recipes = Recipe.query.all()
    return {'recipes': [recipe.to_dict() for recipe in recipes]}
