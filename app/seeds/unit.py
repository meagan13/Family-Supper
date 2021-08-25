from app.models import db, Unit

def seed_units():
    seedArray = []

    seedArray.append(Unit(unit_name = "cup"))
    seedArray.append(Unit(unit_name = "tablespoon"))
    seedArray.append(Unit(unit_name = "teaspoon"))
    seedArray.append(Unit(unit_name = "pound"))
    seedArray.append(Unit(unit_name = "ounce"))
    seedArray.append(Unit(unit_name = "pint"))
    seedArray.append(Unit(unit_name = "quart"))
    seedArray.append(Unit(unit_name = "gallon"))
    seedArray.append(Unit(unit_name = "milliliter"))
    seedArray.append(Unit(unit_name = "liter"))
    seedArray.append(Unit(unit_name = "inch"))
    seedArray.append(Unit(unit_name = "stick"))
    seedArray.append(Unit(unit_name = "gram"))
    seedArray.append(Unit(unit_name = "dash"))
    seedArray.append(Unit(unit_name = "dozen"))
    seedArray.append(Unit(unit_name = "package"))
    seedArray.append(Unit(unit_name = "drop"))
    seedArray.append(Unit(unit_name = "head"))
    seedArray.append(Unit(unit_name = "can"))
    seedArray.append(Unit(unit_name = "jar"))
    seedArray.append(Unit(unit_name = "clove"))

    for item in seedArray:
        db.session.add(item)

    db.session.commit()
