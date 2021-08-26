from flask_wtf import FlaskForm
from wtforms import TextField, IntegerField, SubmitField
from wtforms.validators import DataRequired
from wtforms.widgets.core import TextArea

v = [DataRequired()]

class RecipeForm(FlaskForm):
    title = TextField("title", v)
    author = TextField("author", v)
    description = TextArea("description", v)
    food_img = TextField("food_img")
    card_img = TextField("card_img")
    category_id = IntegerField("category_id", v)
    user_id = IntegerField("user_id", v)
    submit = SubmitField("Submit")
