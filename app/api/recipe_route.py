from flask import Blueprint
from app.models import Recipe

recipe_route = Blueprint('recipe', __name__)

@recipe_route.route('/')
def recipes():
    recipes = Recipe.query.all()
    # return "help"
    return {'recipes': [recipe.to_dict() for recipe in recipes]}

@recipe_route.route('/<int:id>/')
def oneRecipe(id):
    recipe = Recipe.query.get(id)
    return {'recipe': recipe.to_dict()}
