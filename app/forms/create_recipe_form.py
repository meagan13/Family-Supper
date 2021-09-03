from flask_wtf import FlaskForm
from wtforms import TextField, IntegerField, SubmitField, TextAreaField
from wtforms.validators import DataRequired, ValidationError, Length
from wtforms.widgets.core import TextArea

v = [DataRequired()]

class RecipeForm(FlaskForm):
    title = TextField("title", validators=[DataRequired(), Length(min=1, max=50, message="Recipe title must be between 1 and 50 characters.")])
    author = TextField("author", validators=[DataRequired(), Length(min=1, max=50, message="Recipe author must be between 1 and 50 characters.")])
    description = TextAreaField("description", validators=[DataRequired(), Length(min=1, max=150, message="Recipe description must be between 1 and 150 characters.")])
    food_img = TextAreaField("food_img")
    card_img = TextAreaField("card_img")
    category_id = IntegerField("category_id", v)
    user_id = IntegerField("user_id", v)
    submit = SubmitField("Submit")
