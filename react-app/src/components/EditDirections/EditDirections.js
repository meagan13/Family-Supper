import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { editDirectionThunk } from '../../store/direction';
import { useHistory } from 'react-router-dom';
import './EditDirections.css'

const EditDirectionsForm = (recipe) => {
    const directions = (state => state?.directions)

    const dispatch = useDispatch();
    const history = useHistory();

    const [errors, setErrors] = useState([]);
    const [step_number, setStep_number] = useState(recipe.step_number);
    // const [recipe_id, setRecipe_id] = useState(recipe.id)
    const [instruction, setInstruction] = useState(recipe.instruction);

    const editStep = (e) => setStep_number(e.target.value);
    const editIntruction = (e) => setInstruction(e.target.value);

    const handleEditSubmit = async(e) => {
        e.preventDefault();

        const errorData = [];

        if(step_number === 0) {
            errorData.push("Please include a step number.")
        }

        if(instruction === '') {
            errorData.push("Recipe direction field cannot be left blank.")
        }

        if(instruction.length > 200) {
            errorData.push("Each recipe step can be no longer than 200 characters.")
        }

        setErrors(errorData);

        if(errorData.length === 0) {
            const editedDirections = {
                id: recipe.id,
                step_number,
                instruction
            };

            await dispatch(editDirectionThunk(editedDirections));
            setStep_number(step_number);
            setInstruction(instruction);
            history.push(`/recipes/${ recipe.recipe.id }/`)
        }
    }

    return (
        <div className='edit-directions-div'>
            <form className='edit-directions-form' onSubmit={handleEditSubmit}>
                <div className="edit-directions-errors-div">
                        {errors.map((error, i) => (
                        <div key={i}>{error}</div>
                        ))}
                </div>

                <div className="edit-directions-title-text-div">
                    <label className="edit-directions edit-directions-title">Edit Step Number
                        <input type="number" value={step_number} onChange={setStep_number} />
                    </label>
                </div>

                <div className="edit-direction-text-div">
                    <label className="edit-direction-description">Edit Direction
                        <input type="text" value={instruction} onChange={setInstruction} />
                    </label>
                </div>

                <button className="edit-direction-button" type="submit">Edit Direction</button>

            </form>

        </div>
    )
}

export default EditDirectionsForm;
