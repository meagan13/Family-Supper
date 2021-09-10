import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { editDirectionThunk } from '../../store/direction';
import { useHistory } from 'react-router-dom';
import './EditDirections.css'

const EditDirectionsForm = ({directionObj}) => {
    const directions = (state => state?.directions)

    const dispatch = useDispatch();
    const history = useHistory();

    const [errors, setErrors] = useState([]);
    const [step_number, setStep_number] = useState(directionObj?.step_number);
    // const [recipe_id, setRecipe_id] = useState(recipe.id)
    const [instruction, setInstruction] = useState(directionObj?.instruction);

    const handleEditSubmit = async(e, direction) => {
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
                id: directionObj.id,
                step_number,
                instruction,
                recipe_id: directionObj.recipe_id
            };

            await dispatch(editDirectionThunk(editedDirections));
            setStep_number(step_number);
            setInstruction(instruction);
            history.push(`/recipes/${ directionObj.recipe_id }/`)
        }
    }

    return (
        <div className='edit-directions-form-div'>
            <form className='edit-directions-form' onSubmit={(e)=>handleEditSubmit(e)}>
                <div className="edit-directions-errors-div">
                        {errors.map((error, i) => (
                            <div key={i}>{error}</div>
                        ))}
                </div>

                <div className="edit-directions-title-text-div">
                    <label className="edit-directions edit-directions-title">Edit Step Number
                        <input type="number" placeholder={step_number} value={step_number} onChange={(e) => setStep_number(e.target.value)} />
                    </label>
                </div>

                <div className="edit-direction-text-div">
                    <label className="edit-direction-description">Edit Direction
                        <input type="text" placeholder={ instruction } value={instruction} onChange={(e) => setInstruction(e.target.value)} />
                    </label>
                </div>

                <button className="edit-direction-button" type="submit">Edit Direction</button>

            </form>
        </div>
    )
}

export default EditDirectionsForm;
