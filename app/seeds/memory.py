from app.models import db, Memory

def seed_memories():
    seedArray = []

    seedArray.append(Memory(user_id =1,memory_text = "I always loved making these with my mom!", recipe_id = 1))
    seedArray.append(Memory(user_id =2,memory_text = "These are really delicious with a cup of tea.", recipe_id = 1))
    seedArray.append(Memory(user_id =1,memory_text = "The reindeer shapes were always my favorite.", recipe_id = 1))
    seedArray.append(Memory(user_id =1,memory_text = "Warm and melty chocolate chips, mmmm!", recipe_id = 2))
    seedArray.append(Memory(user_id =2,memory_text = "These were my favorite after-school treat.", recipe_id = 2))
    seedArray.append(Memory(user_id =1,memory_text = "This salad always makes me think of grandma.", recipe_id = 3))
    seedArray.append(Memory(user_id =2,memory_text = "I never ate it, but it wasn't Christmas without it!", recipe_id = 3))
    seedArray.append(Memory(user_id =1,memory_text = "These muffins with fresh blueberries...breakfast perfection.", recipe_id = 4))
    seedArray.append(Memory(user_id =2,memory_text = "Silly makes these for my birthday with berries he grows in the backyard!", recipe_id = 4))
    seedArray.append(Memory(user_id =1,memory_text = "You gotta have grandpa bacon for corn chowder, it's a must!", recipe_id = 5))
    seedArray.append(Memory(user_id =2,memory_text = "This was always one of the teachers' favorites when grandma brought it to school to share.", recipe_id = 5))
    seedArray.append(Memory(user_id =1,memory_text = "New York apples for life! Going to the orchard was always one of my favorite family traditions.", recipe_id = 6))
    seedArray.append(Memory(user_id =2,memory_text = "I like my apple pie with some of great-mimi's homemade ice cream, yum!", recipe_id = 6))
    seedArray.append(Memory(user_id =1,memory_text = "Aunt Beth's onion dip is the reason I go to Super Bowl parties.", recipe_id = 7))
    seedArray.append(Memory(user_id =1,memory_text = "I like helping Mimi peel the onions.", recipe_id = 7))
    seedArray.append(Memory(user_id =1,memory_text = "I loved seeing great-grandma Hurd's note to grandma, so special!", recipe_id = 8))
    seedArray.append(Memory(user_id =2,memory_text = "I'll try any salad that has marshmallows in it!", recipe_id = 8))
    seedArray.append(Memory(user_id =1,memory_text = "These are so good with dad's homemade applesauce, too!", recipe_id = 9))
    seedArray.append(Memory(user_id =2,memory_text = "I like mine with ketchup.", recipe_id = 9))
    seedArray.append(Memory(user_id =1,memory_text = "Didn't we grow green bell peppers in the garden one year? Oh wait...that was zucchini. Dozens and dozens of zucchini. ", recipe_id = 10))
    seedArray.append(Memory(user_id =2,memory_text = "One of Silly's favorites!", recipe_id = 10))
    seedArray.append(Memory(user_id =1,memory_text = "Becca made this sauce as part of a 4-H presentation. She got the original recipe from Emeril’s Cookbook for Kids and made a few improvements. This is a blue ribbon sauce!", recipe_id = 11))
    seedArray.append(Memory(user_id =2,memory_text = "I'll always pick a spice cake for my birthday dinner at grandma's!", recipe_id = 12))
    seedArray.append(Memory(user_id =2,memory_text = "Tangy and delicious. ", recipe_id = 13))
    seedArray.append(Memory(user_id =1,memory_text = "Becca made this in school in second grade and wrote out the recipe to make more at home!", recipe_id = 15))
    seedArray.append(Memory(user_id =2,memory_text = "Grandma Alma Hurd worked in the Pulaski school cafeteria for many years and could get a dinner together in no time.  These drop molasses cookies were always a grandkid favorite. ", recipe_id = 16))
    seedArray.append(Memory(user_id =1,memory_text = "Ideal for strawberry shortcake season! Who's ready for three hours at Ferlito's U-pick??", recipe_id = 17))
    seedArray.append(Memory(user_id =2,memory_text = "I recommend adding chocolate chips! :)", recipe_id = 18))
    seedArray.append(Memory(user_id =1,memory_text = "It was so fun to help grandma collect rhubarb from the backyard and then make it into a dessert that we all shared.", recipe_id = 20))
    seedArray.append(Memory(user_id =2,memory_text = "I remember bringing back armloads of rhubarb for the neighbors after visiting grandma's house!", recipe_id = 20))

    for item in seedArray:
        db.session.add(item)

    db.session.commit()

def undo_memories():
    db.session.execute('TRUNCATE memories RESTART IDENTITY CASCADE;')
    db.session.commit()
