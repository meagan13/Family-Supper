import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import ingredients, { editIngredientThunk } from '../../store/ingredient';
import { useHistory } from 'react-router-dom';
import './EditIngredients.css'

const EditIngredientsForm = (recipe) => {
    const sessionUser = useSelector(state => state.session.user)
    const recipes = ((state) => (state?.recipes))
    const ingredients = ((state) => state?.ingredients)

    const dispatch=useDispatch();
    const history = useHistory();

    const [amt, setAmt] = useState();
    const [measurement_id, setMeasurementId] = useState();
    const [ingredient_name, setIngredientName] = useState();
    // const [recipe_id, setRecipe_id] = useState();

    const createAmt = (e) => setAmt(e.target.value);
    const createMeasurement = (e) => setMeasurementId(e.target.value);
    const createIngredient = (e) => setIngredientName(e.target.value);
    // const createRecipe_id = (e) => setRecipe_id(e.target.value);

    const handleIngredientEditSubmit = async(e) => {
        e.preventDefault();

        const editedIngredients = {
            id: ingredients.id,
            amt,
            measurement_id,
            ingredient_name,
            recipe_id: recipe.recipe.id
        }

        await dispatch(editIngredientThunk(editedIngredients))
        createAmt("")
        createMeasurement("")
        createIngredient("")
        history.push(`/recipes/${ recipe.recipe.id }/`)
    }

    return (
        <div className="edit-ingredients-form-div">
            <form className="edit-ingredient-form" onSubmit={handleIngredientEditSubmit}>
                <div>
                    <label className="edit-ingredients edit-ingredient-amt">Edit Ingredient Amount
                        <input type="float" value={ingredients.amt} onChange={createAmt} />
                    </label>
                </div>

                <div>
                    <label className="edit-ingredients edit-ingredients-measurement_id">Edit Ingredient Unit of Measure
                        <select className="unit-select-list" value={measurement_id} onChange={createMeasurement}>
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
                </div>

                <div>
                    <label className="edit-ingredients edit-ingredient-name">Edit Ingredient Name
                        <input type="text" value={ingredients.amt} onChange={createIngredient} />
                    </label>
                </div>

            </form>

        </div>
    )
}

export default EditIngredientsForm;
