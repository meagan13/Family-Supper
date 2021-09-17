import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { createIngredientThunk, getIngredientsByRecipeThunk } from '../../store/ingredient';
import './Ingredients.css';

const AddIngredientForm = ({recipe, setShowNext}) => {
    const dispatch = useDispatch();

    const ingredients = useSelector((state) => (state?.ingredients));
    const ingredientsArr = Object.values(ingredients);

    const [errors, setErrors] = useState([]);
    const [amt, setAmt] = useState();
    const [measurement, setMeasurement] = useState();
    const [ingredient_name, setIngredientName] = useState('');

    useEffect(() => {
        dispatch(getIngredientsByRecipeThunk(recipe.id))
    }, [dispatch])

    // console.log("ingredientsArr", ingredientsArr)

    // const onIngredientChange = (e) => {
    //     setIngredientName(e.target.value);
    // }

    const addIngredienthandleSubmit = async(e) => {
        e.preventDefault();
        const errorData = [];

        if(ingredient_name === '') {
            errorData.push('Please add an ingredient.')
        }

        if(ingredient_name.length > 100) {
            errorData.push('Ingredients can be no longer than 100 characters.')
        }

        setErrors(errorData);

        if(errorData.length === 0) {

            setShowNext(true);

            const addIngredient = {
                amt,
                measurement,
                ingredient_name,
                recipe_id: recipe?.id
            }

            await dispatch(createIngredientThunk(addIngredient));
            setAmt("");
            setMeasurement("");
            setIngredientName("");
            alert(`${amt} ${ingredient_name} added to your recipe.`)
        }

    }

    return (
        <div className="ingredient-form-div">
            <form className="ingredient-form" onSubmit={addIngredienthandleSubmit}>
                <div className="create-ingredient-errors-div">
                    {errors.map((error, i) => (
                    <div key={i}><p>{error}</p></div>
                    ))}
                </div>

                <div className="create-ingredient-intro-div">
                    <h1 className="create-ingredient-intro-text">Add ingredients</h1>
                    <h2 className="create-ingredient-instruct-text">Add as many ingredients as you'd like! </h2>
                    <h4 className="create-ingredient-instruct-text">Click <strong>Add Ingredient</strong> before entering another ingredient.</h4>
                    <h4 className="create-ingredient-instruct-text">Click <strong>Next</strong> when you have finished entering ingredients and are ready to add directions.</h4>
                </div>

                <div className="amt-input-div">
                    <label className="amt-number">Numeric Amount:
                        <input id="amt-input" value={amt} type="number" step="0.01" precision="2" min='0' onChange={(e) => setAmt(e.target.value)} placeholder="Ex: 1." />
                    </label>
                </div>

                <div className="ingredient-input-div">
                    <label className="ingredient">Units of Ingredient:
                        <input id="ingredient-input" type="text" value={ingredient_name} onChange={(e) => setIngredientName(e.target.value)} placeholder="Ex: cups of flour" />
                    </label>
                </div>

                <button className="ingredient-submit-button" type="submit">Add Ingredient</button>

                {/* <div className="entered-ingredients-div">
                    <h3 className="submitted-ingredients-title-text">Submitted Ingredients:</h3>
                    {ingredientsArr?.reverse().map((ingredient) => {
                        return <div className="one-submitted-ingredient-div" key={ingredient?.id}>
                            <p className="one-submitted-ingredient-text">{ingredient?.amt} {ingredient?.ingredient_name}</p>
                        </div>

                    })}
                </div> */}
            </form>


        </div>
    )

}

export default AddIngredientForm;
