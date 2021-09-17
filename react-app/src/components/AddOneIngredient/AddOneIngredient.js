import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { createIngredientThunk } from '../../store/ingredient';
import MyImage from '../AddOneDirection/plus.png'
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
            <div className="add-one-ingredient-form-div">
                <form className="add-one-ingredient-form" onSubmit={addIngredienthandleSubmit}>
                    <div className="create-one-ingredient-errors-div">
                        {errors.map((error, i) => (
                        <div key={i}><p>{error}</p></div>
                        ))}
                    </div>

                    <div className="render-add-one-ingredient-div">
                        {ingArr.map((ingredient, i) => (
                        <div key={i}>{ingredient?.measurement}</div>
                        ))}
                    </div>

                    <div className="add-one-ingredient-intro-div">
                        <p className="add-one-ingredient-intro-text">Add ingredient:</p>
                    </div>

                    <div className="add-one-amt-input-div">
                        <label className="add-one-amt-number">
                            <input id="add-one-amt-input" value={amt} type="number" step="0.01" precision="2" min='0' onChange={(e) => setAmt(e.target.value)} placeholder="#" />
                        </label>
                    </div>

                    <div className="add-one-ingredient-input-div">
                        <label className="add-one-ingredient">
                            <input id="add-one-ingredient-input" type="text" value={ingredient_name} onChange={onIngredientChange} placeholder="Ex: cups of flour" />
                        </label>
                    </div>

                    <button className="add-one-ingredient-submit-button" type="submit"><img className="one-direction-submit-button-icon" src={MyImage} /></button>
                </form>

            </div>
        )

}

export default AddOneIngredient;
