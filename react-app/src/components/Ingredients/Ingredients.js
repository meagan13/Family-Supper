import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { createIngredientThunk } from '../../store/ingredient';
import './Ingredients.css';

const AddIngredientForm = ({recipe, setShowNext}) => {
    // const sessionUser = useSelector(state => state?.session.user)
    // const allRecipes = useSelector((state) => state?.recipes)

    const dispatch = useDispatch();

    // console.log('recipes in add ingredient form:', allRecipes)
    // console.log("Check ingredients for recipe 1", allRecipes[1].ingredients)

    // console.log("add ingredient recipe", recipe)

    const [errors, setErrors] = useState([]);
    const [ingArr, setIngArr] = useState([]);
    const [amt, setAmt] = useState();
    const [measurement, setMeasurement] = useState();
    const [ingredient_name, setIngredientName] = useState('');

    const addIngredienthandleSubmit = async(e) => {
        e.preventDefault();
        const errorData = [];
        const ingredientArr = ["test one", "test two"];

        if(ingredient_name === '') {
            errorData.push('Please add an ingredient.')
        } else {
            ingredientArr.push(ingredient_name)
        }

        if(ingredient_name.length > 50) {
            errorData.push('Ingredients can be no longer than 50 characters.')
        }

        setErrors(errorData);
        setIngArr(ingredientArr);

        // console.log("updated ingArr state:", ingArr)

        if(errorData.length === 0) {

            setShowNext(true);

            const addIngredient = {
                amt,
                measurement,
                ingredient_name,
                recipe_id: recipe.id
            }

            // console.log("addIngredient payload:", addIngredient)

            await dispatch(createIngredientThunk(addIngredient));
            setAmt("");
            setMeasurement("");
            setIngredientName("");
            // ingredientArr.push("This is a test")
            // console.log("Ingredient array:", ingredientArr)
        }
    }



    return (
        <div className="ingredient-form-div">
            <form className="ingredient-form" onSubmit={addIngredienthandleSubmit}>
                <div className="create-ingredient-errors-div">
                    {errors.map((error, i) => (
                    <div key={i}>{error}</div>
                    ))}
                </div>

                <div className="render-ingredients-div">
                    {ingArr.map((ingredient, i) => (
                    <div key={i}>{ingredient?.measurement}</div>
                    ))}
                </div>

                <div className="create-ingredient-intro-div">
                    <h1 className="create-ingredient-intro-text">Add ingredients</h1>
                    <h3 className="create-ingredient-instruct-text">Click <strong>Add Ingredient</strong> before entering another ingredient.</h3>
                    <h3 className="create-ingredient-instruct-text">Click <strong>Next</strong> when you are ready to add instructions!</h3>
                </div>

                <div className="amt-input-div">
                    <label className="amt-number">Numeric Amount:
                        <input value={amt} type="number" step="0.01" precision="2" min='0' onChange={(e) => setAmt(e.target.value)} placeholder="Ex: 1." />
                    </label>
                </div>

                <div className="ingredient-input-div">
                    <label className="ingredient">Units of Ingredient:
                        <input type="text" value={ingredient_name} onChange={(e) => setIngredientName(e.target.value)} placeholder="Ex: cups of flour" />
                    </label>
                </div>

                <div>
                    <div className="unit-content-div">
                        {/* <label>Choose a Unit:</label> */}
                        {/* <div className="unit-list"> */}
                            {/* <select id="create-unit-select" className="create-unit-select-list" value={measurement} onChange={(e) => setMeasurement(Number(e.target.value))}>
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
                            </select> */}
                        {/* </div> */}

                    </div>
                </div>


                <button className="ingredient-submit-button" type="submit">Add Ingredient</button>
            </form>


        </div>
    )

}

export default AddIngredientForm;
