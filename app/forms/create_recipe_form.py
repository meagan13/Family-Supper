from flask_wtf import FlaskForm
from wtforms import TextField, IntegerField, SubmitField, TextAreaField
from wtforms.validators import DataRequired, ValidationError, URL
from wtforms.widgets.core import TextArea

v = [DataRequired()]

class RecipeForm(FlaskForm):
    title = TextField("title", v)
    author = TextField("author", v)
    description = TextAreaField("description", v)
    food_img = TextAreaField("food_img", [URL()])
    card_img = TextAreaField("card_img", [URL()])
    category_id = IntegerField("category_id", v)
    user_id = IntegerField("user_id", v)
    submit = SubmitField("Submit")
