from flask import Blueprint
from app.models import Memory

memory_route = Blueprint('memory', __name__)

@memory_route.route('/')
def memories():
    memories = Memory.query.all()
    return {'memories': [memory.to_dict() for memory in memories]}

@memory_route.route('/recipeId/<int:id>/')
def memoriesByRecipe(id):
    memories = Memory.query.filter(Memory.recipe_id == id).all()
    # return {'memory': memory.to_dict()}
    return {"allMemories": [memory.to_dict() for memory in memories]}
