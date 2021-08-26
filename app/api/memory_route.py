from flask import Blueprint
from app.models import Memory, memory

memory_route = Blueprint('memory', __name__)

@memory_route.route('/')
def memories():
    memories = Memory.query.all()
    return {'memories': [memory.to_dict() for memory in memories]}

@memory_route.route('/<int:id>')
def oneMemory(id):
    memory = Memory.query.get(id)
    return {'memory': memory.to_dict()}
