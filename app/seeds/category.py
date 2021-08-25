from app.models import db, Category

def seed_categories():
    seedArray = []

    seedArray.append(Category(cat_name = "Soups"))
    seedArray.append(Category(cat_name = "Salads"))
    seedArray.append(Category(cat_name = "Appetizers"))
    seedArray.append(Category(cat_name = "Cookies"))
    seedArray.append(Category(cat_name = "Cakes and Dessert"))
    seedArray.append(Category(cat_name = "Muffins and Breads"))
    seedArray.append(Category(cat_name = "Vegetables and Sides"))
    seedArray.append(Category(cat_name = "Meats"))

    for item in seedArray:
        db.session.add(item)

    db.session.commit()
