from flask_wtf import FlaskForm
from wtforms import TextField, IntegerField, SubmitField
from wtforms.validators import DataRequired

v = [DataRequired()]

class DirectionsForm(FlaskForm):
    step_number = IntegerField("step_number", v)
    recipe_id = IntegerField("recipe_id", v)
    instruction = TextField("instruction", v)
    submit = SubmitField("Submit")
