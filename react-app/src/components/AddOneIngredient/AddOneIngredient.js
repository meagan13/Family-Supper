import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { createIngredientThunk } from '../../store/ingredient';
import './AddOneIngredient.css';

const AddOneIngredient = ({recipe}) => {
    const dispatch = useDispatch();

    const [errors, setErrors] = useState([]);
    const [ingArr, setIngArr] = useState([]);
    const [amt, setAmt] = useState();
    const [measurement, setMeasurement] = useState();
    const [ingredient_name, setIngredientName] = useState('');

    const onIngredientChange = (e) => {
        setIngredientName(e.target.value);
    }

    const addIngredienthandleSubmit = async(e) => {
        e.preventDefault();
        const errorData = [];
        const ingredientArr = ["test one", "test two"];

        if(ingredient_name === '') {
            errorData.push('Please add an ingredient.')
        } else {
            ingredientArr.push(ingredient_name)
        }

        if(ingredient_name.length > 100) {
            errorData.push('Ingredients can be no longer than 100 characters.')
        }

        setErrors(errorData);
        setIngArr(ingredientArr);

        if(errorData.length === 0) {

            const addIngredient = {
                amt,
                measurement,
                ingredient_name,
                recipe_id: recipe.id
            }

            await dispatch(createIngredientThunk(addIngredient));
            setAmt("");
            setMeasurement("");
            setIngredientName("");
            alert(`${amt} ${ingredient_name} added to your recipe.`)
        }
    }

        return (
            <div className="one-ingredient-form-div">
                <form className="one-ingredient-form" onSubmit={addIngredienthandleSubmit}>
                    <div className="create-one-ingredient-errors-div">
                        {errors.map((error, i) => (
                        <div key={i}><p>{error}</p></div>
                        ))}
                    </div>

                    <div className="render-one-ingredient-div">
                        {ingArr.map((ingredient, i) => (
                        <div key={i}>{ingredient?.measurement}</div>
                        ))}
                    </div>

                    {/* <div className="create-one-ingredient-intro-div">
                        <h1 className="create-one-ingredient-intro-text">Add ingredients</h1>
                        <h2 className="create-one-ingredient-instruct-text">Add as many ingredients as you'd like! </h2>
                        <h4 className="create-one-ingredient-instruct-text">Click <strong>Add Ingredient</strong> before entering another ingredient.</h4>
                        <h4 className="create-one-ingredient-instruct-text">Click <strong>Next</strong> when you have finished entering ingredients and are ready to add directions.</h4>
                    </div> */}

                    <div className="amt-input-div">
                        <label className="amt-number">Numeric Amount:
                            <input id="amt-input" value={amt} type="number" step="0.01" precision="2" min='0' onChange={(e) => setAmt(e.target.value)} placeholder="Ex: 1." />
                        </label>
                    </div>

                    <div className="ingredient-input-div">
                        <label className="one-ingredient">Units of Ingredient:
                            <input id="one-ingredient-input" type="text" value={ingredient_name} onChange={onIngredientChange} placeholder="Ex: cups of flour" />
                        </label>
                    </div>

                    <button className="one-ingredient-submit-button" type="submit">Add Ingredient</button>
                </form>

            </div>
        )

}

export default AddOneIngredient;
