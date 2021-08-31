import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { createDirectionThunk } from '../../store/direction';
import './CreateDirections.css'

const CreateDirections = (recipeInfo) => {
    const sessionUser = useSelector(state => state?.session.user)
    const allRecipes = useSelector((state) => state?.recipes)

    const dispatch = useDispatch();

    const [step_number, setStep_number] = useState(0);
    // const [recipe_id, setRecipeId] = useState();
    const [instruction, setInstruction] = useState('');


    const handleSubmit = async(e) => {
        e.preventDefault()

        const directions = {
            step_number,
            instruction,
            recipe_id: recipeInfo?.recipe.id,
        }

        await dispatch(createDirectionThunk(directions))
    }

    return (
        <div className="create-directions-div">
            <form className="create-directions-form" onSubmit={handleSubmit}>

                <div className="create-directions-intro-div">
                    <h1 className="create-directions-intro-text">Add directions</h1>
                    <h3 className='create-directions-instruct-text'>One step at a time!</h3>
                </div>

                <div className="create-step-div input-div">
                    <div>
                        <label className="step-number input-div">
                            <input className="step-input" type="integer" onChange={(e) => setStep_number(e.target.value)} placeholder="Ex: 1"/>
                        </label>
                    </div>

                    <div className="create-directions-text-div">
                        <label className="directions-label">
                            <input type="text" onChange={(e) => setInstruction(e.target.value)} placeholder="Ex: Mix together dry ingredients." />
                        </label>
                    </div>
                </div>

                <button className="direction-submit-button" type="submit">Add Direction</button>

            </form>

        </div>
    )
}

export default CreateDirections;
