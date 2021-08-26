import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import './CreateDirections.css'

const CreateDirections = () => {
    const sessionUser = useSelector(state => state.session.user);
    const recipeInfo = useSelector(state => state.recipes);

    const dispatch = useDispatch();

    const [step_number, setStep_number] = useState();
    // const [recipe_id, setRecipeId] = useState();
    const [instruction, setInstruction] = useState();

    const createStep_number = (e) => setStep_number(e.target.value)
    // const createRecipe_id = (e) => setRecipeId(e.target.value)
    const createInstruction = (e) => setInstruction(e.target.value)

    const handleSubmit = async(e) => {
        e.preventDefault()

        const directions = {
            step_number,
            recipe_id: recipeInfo.id,
            instruction
        }

        // await dispatch(createDirectionsThunk(directions))
    }

    return (
        <div className="create-directions-div">
            <form className="directions-form" onSubmit={handleSubmit}>
                <label className="step-number">
                    <input type="integer" onChange={createStep_number} placeholder="Instruction step number:"/>
                </label>

                <label>
                    <input type="text" onChange={createInstruction} placeholder="Add instruction step:" />
                </label>

            </form>

        </div>
    )
}

export default CreateDirections;
