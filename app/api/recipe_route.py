from flask import Blueprint, request
from app.models import Recipe, db
from app.forms.create_recipe_form import RecipeForm

recipe_route = Blueprint('recipe', __name__)

@recipe_route.route('/')
def recipes():
    recipes = Recipe.query.all()
    # return "help"
    return {'recipes': [recipe.to_dict() for recipe in recipes]}

@recipe_route.route('/<int:id>/')
def oneRecipe(id):
    recipe = Recipe.query.get(id)
    return recipe.recipe_memories()

@recipe_route.route('/', methods=["POST"])
def postRecipe():
    form = RecipeForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print("In the recipe POST route")
    print("form.data", form.data)
    if form.validate_on_submit():
        data = form.data
        new_recipe = Recipe(title=data["title"],
                            author=data["author"],
                            description=data["description"],
                            food_img=data["food_img"],
                            card_img=data["card_img"],
                            category_id=data["category_id"],
                            user_id=data["user_id"])
        db.session.add(new_recipe)
        db.session.commit()
        return new_recipe.to_dict()
    return { form.errors }


@recipe_route.route('/<int:id>/', methods=['PUT'])
def editRecipe(id):
    form = RecipeForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        oldRecord = Recipe.query.get(id)
        form.populate_obj(oldRecord)

        db.session.add(oldRecord)
        db.session.commit()

        return oldRecord.to_dict()
    return {form.errors}


@recipe_route.route('/<int:id>/', methods=['DELETE'])
def deleteRecipe(id):

    recipe = Recipe.query.get(id)
    db.session.delete(recipe)
    db.session.commit()

    return recipe.to_dict()
