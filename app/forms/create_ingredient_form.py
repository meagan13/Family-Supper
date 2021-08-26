from flask_wtf import FlaskForm
from wtforms import TextField, IntegerField, SubmitField
from wtforms.fields.core import FloatField
from wtforms.validators import DataRequired

v = [DataRequired()]

class IngredientForm(FlaskForm):
    amt = FloatField("amt")
    measurement_id = IntegerField("measurement_id")
    ingredient_name = TextField("ingredient_name", v)
    recipe_id = IntegerField("recipe_id", v)
    submit = SubmitField("Submit")
