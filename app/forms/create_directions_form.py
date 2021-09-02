from flask_wtf import FlaskForm
from wtforms import TextField, IntegerField, SubmitField
from wtforms.validators import DataRequired, ValidationError

v = [DataRequired()]

class DirectionsForm(FlaskForm):
    step_number = IntegerField("step_number")
    recipe_id = IntegerField("recipe_id", v)
    instruction = TextField("instruction", v)
    submit = SubmitField("Submit")
