from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, SubmitField, TextAreaField
from wtforms.validators import DataRequired, ValidationError, Length
from app.models import Memory

v = [DataRequired()]

class MemoryForm(FlaskForm):
    # class Meta:
    #     csrf = True  # https://rules.sonarsource.com/python/RSPEC-4502
    user_id = IntegerField("user_id", validators=v)
    memory_text = StringField("memory_text", validators=[DataRequired(), Length(min=1, max=150, message="Memories must be 1-150 characters.")])
    # memory_text = TextAreaField("memory_text", validators=v)
    recipe_id = IntegerField("recipe_id", validators=v)
    submit = SubmitField("Submit")
