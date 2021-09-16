import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { editIngredientThunk, deleteIngredientThunk } from '../../store/ingredient';
import { useHistory } from 'react-router-dom';
import './EditIngredients.css'

const EditIngredientsForm = ({ingredientObj}) => {
    // const sessionUser = useSelector(state => state.session.user)
    // const recipes = useSelector((state) => (state?.recipes))
    const ingredients = useSelector((state) => state?.ingredients)
    // console.log("In the EditIngredientForm component")
    console.log("ingredient from edit:", ingredientObj.id)

    const dispatch=useDispatch();
    const history = useHistory();

    const [amt, setAmt] = useState(ingredientObj?.amt);
    // const [measurement, setMeasurement] = useState(ingredientObj?.measurement);
    const [ingredient_name, setIngredientName] = useState(ingredientObj.ingredient_name);

    const handleIngredientEditSubmit = async(e) => {
        e.preventDefault();

        // console.log("e.target.value", e.target.value)
        // console.log("ingredientObj", ingredientObj)
        console.log("in the handleSubmit")
        const editedIngredient = {
            id: ingredientObj.id,
            amt,
            // measurement,
            ingredient_name,
            recipe_id: ingredientObj.recipe_id
        }

        // console.log("editedIngredient:", editedIngredient)
        await dispatch(editIngredientThunk(editedIngredient))
        setAmt(amt);
        setIngredientName(ingredient_name);
        history.push(`/recipes/${ ingredientObj?.recipe_id }/`)
    }

    const deleteIngredient = async(e, ingredientIdToDelete) => {
        e.preventDefault();

        return dispatch(deleteIngredientThunk(ingredientIdToDelete))
            .catch(async(res) => {
                await res.json();
            });
    }

    return (
        <div className="edit-ingredients-form-div">
            <form className="edit-ingredient-form" onSubmit={(e)=>handleIngredientEditSubmit(e)}>

                    <div className="edit-ingredient-amt-div">
                        <label className="edit-ingredients edit-ingredient-amt">Edit Ingredient Amount
                            <input type="float" placeholder={amt} value={amt} onChange={(e) => setAmt(e.target.value)} />
                        </label>
                    </div>

                    <div className="edit-ingredient-name-div">
                        <label className="edit-ingredients edit-ingredient-name">Edit Ingredient Unit and Name
                            <input type="text" value={ingredient_name} onChange={(e) => setIngredientName(e.target.value)} />
                        </label>
                    </div>

                    <button className="edit-ingredient-button" type="submit">Edit</button>

                    <button className="delete-ingredient-button" type="submit" onClick={(e) => deleteIngredient(e, ingredientObj?.id)}>Delete</button>
            </form>
        </div>

    )
}

export default EditIngredientsForm;


{/* <div>
                        <label className="edit-ingredients edit-ingredients-measurement">Edit Ingredient Unit of Measure
                            <select className="edit-unit-select-list" value={measurement} onChange={setMeasurement}>
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
