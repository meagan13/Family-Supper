from flask import Blueprint, request
from app.models import Memory, db
from app.forms.memory_form import MemoryForm

memory_route = Blueprint('memory', __name__)

@memory_route.route('/')
def memories():
    memories = Memory.query.all()
    return {'memories': [memory.to_dict() for memory in memories]}

@memory_route.route('/recipeId/<int:id>/')
def memoriesByRecipe(id):
    memories = Memory.query.filter(Memory.recipe_id == id).all()
    return {"allMemories": [memory.to_dict() for memory in memories]}

@memory_route.route('/', methods=["POST"])
def postMemory():
    form = MemoryForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        new_memory = Memory(user_id=data["user_id"],
                            memory_text=data["memory_text"],
                            recipe_id=data["recipe_id"])
        db.session.add(new_memory)
        db.session.commit()
        return new_memory.to_dict()
    return { 'error': 'the memory post route did not work'}

@memory_route.route('/<int:id>/', methods=['PUT'])
def editMemory(id):
    form = MemoryForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        oldRecord = Memory.query.get(id)
        form.populate_obj(oldRecord)

        db.session.add(oldRecord)
        db.session.commit()

        return oldRecord.to_dict()
    return {'error': 'memory PUT route did not work'}


@memory_route.route('/<int:id>/', methods=['DELETE'])
def deleteMemory(id):

    memory = Memory.query.get(id)
    db.session.delete(memory)
    db.session.commit()

    return memory.to_dict()

