import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { editIngredientThunk } from '../../store/ingredient';
import { useHistory } from 'react-router-dom';
import './EditIngredients.css'

const EditIngredientsForm = ({ingredientsObj}) => {
    // const sessionUser = useSelector(state => state.session.user)
    // const recipes = useSelector((state) => (state?.recipes))
    const ingredients = useSelector((state) => state?.ingredients)

    // console.log("ingredients from edit:", ingredientsObj)

    const dispatch=useDispatch();
    const history = useHistory();

    const [amt, setAmt] = useState(0);
    const [measurement, setMeasurement] = useState(1);
    const [ingredient_name, setIngredientName] = useState("Placeholder");

    const handleIngredientEditSubmit = async(e, ingredient) => {
        e.preventDefault();

        console.log("e.target.value", e.target.value)
        console.log("ingredient", ingredient)
        console.log("in the handleSubmit")
        const editedIngredient = {
            id: ingredient.id,
            amt,
            measurement,
            ingredient_name,
            recipe_id: ingredient.recipe_id
        }

        console.log("editedIngredient:", editedIngredient)
        await dispatch(editIngredientThunk(editedIngredient))
        // setAmt(2);
        // setIngredientName("TESTING");
        // history.push(`/recipes/${ ingredient.recipe_id }/`)
    }

    return (
        <div className="edit-ingredients-form-div">
                <div>
                    {ingredients && Object.values(ingredientsObj)?.map((ingredient, i) => (
                        <form className="edit-ingredient-form" onSubmit={(e)=>handleIngredientEditSubmit(e, ingredient)}>
                            <div key={i}>

                                <p>From editIng Component: {ingredient.ingredient_name}</p>

                                <div>
                                    <label className="edit-ingredients edit-ingredient-amt">Edit Ingredient Amount
                                        <input type="float" placeholder={ingredient?.amt} value={ingredient?.amt} onChange={(e) => setAmt(e.target.value)} />
                                    </label>
                                </div>

                                <div>
                                    <label className="edit-ingredients edit-ingredient-name">Edit Ingredient Unit and Name
                                        <input type="text" value={ingredient?.ingredient_name} onChange={(e) => setIngredientName(e.target.value)} />
                                    </label>
                                </div>

                                <button className="edit-ingredient-button" type="submit">Edit Ingredient</button>
                            </div>
                        </form>
                    ))}
                </div>

                {/* <div>
                    <label className="edit-ingredients edit-ingredients-measurement">Edit Ingredient Unit of Measure
                        <select className="edit-unit-select-list" value={measurement} onChange={editMeasurement}>
                            <option selected disabled hidden>Select a Unit of Measure</option>
                            <option value='1'>cup</option>
                            <option value='2'>tablespoon</option>
                            <option value='3'>teaspoon</option>
                            <option value='4'>pound</option>
                            <option value='5'>ounce</option>
                            <option value='6'>pint</option>
                            <option value='7'>quart</option>
                            <option value='8'>gallon</option>
                            <option value='9'>milliliter</option>
                            <option value='10'>liter</option>
                            <option value='11'>inch</option>
                            <option value='12'>stick</option>
                            <option value='13'>gram</option>
                            <option value='14'>dash</option>
                            <option value='15'>dozen</option>
                            <option value='16'>package</option>
                            <option value='17'>drop</option>
                            <option value='18'>head</option>
                            <option value='19'>can</option>
                            <option value='20'>jar</option>
                            <option value='21'>clove</option>
                        </select>
                    </label>
                </div> */}

        </div>
    )
}

export default EditIngredientsForm;
