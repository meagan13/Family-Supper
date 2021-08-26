from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, SubmitField, TextAreaField
from wtforms.validators import DataRequired
from app.models import Memory

v = [DataRequired()]

class MemoryForm(FlaskForm):
    user_id = IntegerField("user_id", validators=v)
    memory_text = StringField("memory_text", validators=v)
    # memory_text = TextAreaField("memory_text", validators=v)
    recipe_id = IntegerField("recipe_id", validators=v)
    submit = SubmitField("Submit")
