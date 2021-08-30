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
            <form className="directions-form" onSubmit={handleSubmit}>
                <label className="step-number">
                    <input type="integer" onChange={(e) => setStep_number(e.target.value)} placeholder="Instruction step number:"/>
                </label>

                <label>
                    <input type="text" onChange={(e) => setInstruction(e.target.value)} placeholder="Add instruction step:" />
                </label>

                <button className="direction-submit-button" type="submit">Add Direction</button>

            </form>

        </div>
    )
}

export default CreateDirections;
