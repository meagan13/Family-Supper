from flask import Blueprint, request
from app.models import Direction, db
# from app.models.recipe import Recipe
from app.forms.create_directions_form import DirectionsForm

direction_route = Blueprint('direction', __name__)

@direction_route.route('/recipeId/<int:id>/')
def directionsByRecipe(id):
    directions = Direction.query.filter(Direction.recipe_id == id).all()
    return {"allDirectionsByRecipe": {direction.id:direction.to_dict() for direction in directions}}

@direction_route.route('/', methods=["POST"])
def postDirection():
    form = DirectionsForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        new_direction = Direction(step_number=data["step_number"],
                            instruction=data["instruction"],
                            recipe_id=data["recipe_id"])
        db.session.add(new_direction)
        db.session.commit()
        return new_direction.to_dict()
    return { form.errors }

@direction_route.route('/<int:id>/', methods=['PUT'])
def editDirection(id):
    form = DirectionsForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        oldRecord = Direction.query.get(id)
        form.populate_obj(oldRecord)

        db.session.add(oldRecord)
        db.session.commit()

        return oldRecord.to_dict()
    return {form.errors}


@direction_route.route('/<int:id>/', methods=['DELETE'])
def deleteDirection(id):

    direction = Direction.query.get(id)
    db.session.delete(direction)
    db.session.commit()

    return direction.to_dict()
