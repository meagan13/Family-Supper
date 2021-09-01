from flask.cli import AppGroup
from .users import seed_users, undo_users
from .category import seed_categories, undo_categories
from .direction import seed_directions, undo_directions
from .ingredient import seed_ingredients, undo_ingredients
from .memory import seed_memories, undo_memories
from .recipe import seed_recipes, undo_recipes

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
# Order here MATTERS!
@seed_commands.command('all')
def seed():
    seed_users()
    seed_categories()
    seed_recipes()
    seed_directions()
    seed_ingredients()
    seed_memories()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_categories()
    undo_recipes()
    undo_directions()
    undo_ingredients()
    undo_memories()
    # Add other undo functions here
