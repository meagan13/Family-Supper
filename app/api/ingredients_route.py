from app.models.recipe import Recipe
from flask import Blueprint, request
from app.models import Ingredient
# from app.forms.create_ingredient_form import IngredientForm

ingredient_route = Blueprint('ingredient', __name__)

@ingredient_route.route('/recipeId/<int:id>/')
def ingredientsByRecipe(id):
    ingredients = Ingredient.query.filter(Ingredient.recipe_id == id).all()
    return {"allIngredientsByRecipe": {ingredient.id:ingredient.to_dict() for ingredient in ingredients}}
