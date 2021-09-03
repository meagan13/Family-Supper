from flask_wtf import FlaskForm
from wtforms import TextField, IntegerField, SubmitField
from wtforms.validators import DataRequired, ValidationError, Length

v = [DataRequired()]

class DirectionsForm(FlaskForm):
    step_number = IntegerField("step_number", v)
    recipe_id = IntegerField("recipe_id", v)
    instruction = TextField("instruction", [DataRequired(), Length(min=1, max=200)])
    submit = SubmitField("Submit")
