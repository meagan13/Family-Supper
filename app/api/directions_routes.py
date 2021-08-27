from app.models.recipe import Recipe
from flask import Blueprint, request
from app.models import Direction
# from app.forms.create_directions_form import DirectionsForm

direction_route = Blueprint('direction', __name__)

@direction_route.route('/recipeId/<int:id>/')
def directionsByRecipe(id):
    directions = Direction.query.filter(Direction.recipe_id == id).all()
    return {"allDirectionsByRecipe": {direction.id:direction.to_dict() for direction in directions}}
