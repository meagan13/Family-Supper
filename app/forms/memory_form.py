from flask_wtf import FlaskForm
from wtforms import TextField, IntegerField, SubmitField
from wtforms.validators import DataRequired

v = [DataRequired()]

class MemoryForm(FlaskForm):
    user_id = IntegerField("user_id")
    memory_text = TextField("Memory", v)
    recipe_id = IntegerField("recipe_id")
    submit = SubmitField("Submit")
