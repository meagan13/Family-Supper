from flask import Blueprint, request
from app.models import Ingredient, db
from app.forms.create_ingredient_form import IngredientForm

ingredient_route = Blueprint('ingredient', __name__)

@ingredient_route.route('/recipeId/<int:id>/')
def ingredientsByRecipe(id):
    ingredients = Ingredient.query.filter(Ingredient.recipe_id == id).all()
    return {"allIngredientsByRecipe": {ingredient.id:ingredient.to_dict() for ingredient in ingredients}}

@ingredient_route.route('/', methods=["POST"])
def postIngredient():
    form = IngredientForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        new_ingredient = Ingredient(amt=data["amt"],
                            measurement=data["measurement"],
                            ingredient_name=data["ingredient_name"],
                            recipe_id=data["recipe_id"])
        db.session.add(new_ingredient)
        db.session.commit()
        return new_ingredient.to_dict()
    return form.errors

@ingredient_route.route('/<int:id>/', methods=['PUT'])
def editIngredient(id):
    form = IngredientForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        oldRecord = Ingredient.query.get(id)
        form.populate_obj(oldRecord)

        db.session.add(oldRecord)
        db.session.commit()

        return oldRecord.to_dict()
    return form.errors


@ingredient_route.route('/<int:id>/', methods=['DELETE'])
def deleteIngredient(id):

    ingredient = Ingredient.query.get(id)
    db.session.delete(ingredient)
    db.session.commit()

    return ingredient.to_dict()
