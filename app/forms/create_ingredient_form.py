from flask_wtf import FlaskForm
from wtforms import TextField, IntegerField, SubmitField
from wtforms.fields.core import FloatField
from wtforms.validators import DataRequired, ValidationError

v = [DataRequired()]

class IngredientForm(FlaskForm):
    amt = FloatField("amt")
    measurement = TextField("measurement")
    ingredient_name = TextField("ingredient_name", v)
    recipe_id = IntegerField("recipe_id", v)
    submit = SubmitField("Submit")
