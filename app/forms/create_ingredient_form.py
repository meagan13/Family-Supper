from flask_wtf import FlaskForm
from wtforms import TextField, IntegerField, SubmitField
from wtforms import validators
from wtforms.fields.core import FloatField
from wtforms.validators import DataRequired, ValidationError, Length

v = [DataRequired()]

class IngredientForm(FlaskForm):
    amt = FloatField("amt")
    measurement = TextField("measurement")
    ingredient_name = TextField("ingredient_name", validators=[DataRequired(), Length(min=1, max=50, message="Ingredient much be 1-50 characters long.")])
    recipe_id = IntegerField("recipe_id", v)
    submit = SubmitField("Submit")
