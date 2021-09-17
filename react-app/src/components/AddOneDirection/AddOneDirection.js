import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { createDirectionThunk } from '../../store/direction';
import MyImage from '../AddOneDirection/plus.png'
import './AddOneDirection.css'

const AddOneDirection = ({recipe}) => {
    const dispatch = useDispatch();

    const [errors, setErrors] = useState([]);
    const [step_number, setStep_number] = useState('');
    const [instruction, setInstruction] = useState('');

    const onStepChange = (e) => {
        setStep_number(e.target.value);
    }

    const onDirectionChange = (e) => {
        setInstruction(e.target.value);
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        const errorData = [];

        if(step_number <= 0) {
            errorData.push("Please add a direction step number.")
        }

        if(instruction === '') {
            errorData.push("Please include a direction/step.")
        }

        if(instruction?.length > 200) {
            errorData.push('Each recipe instruction step should be no longer than 200 characters.')
        }

        setErrors(errorData);

        if(errorData?.length === 0) {

            const directions = {
                step_number,
                instruction,
                recipe_id: recipe.id,
            }

            await dispatch(createDirectionThunk(directions))
            setStep_number('');
            setInstruction('');
            alert(`${step_number}. ${instruction} added to your recipe.`)
        }
    }

    return (
        <div className="create-one-direction-div">
            <form className="create-one-direction-form" onSubmit={handleSubmit}>

                <div className="create-one-direction-errors-div">
                    {errors?.map((error, i) => (
                    <div key={i}><p>{error}</p></div>
                    ))}

                </div>

                <div className="add-one-direction-intro-div">
                    <p className="add-one-direction-intro-text">Add step:</p>
                </div>

                <div className="create-one-step-div">
                    <label className="one-step-number">
                        <input value={step_number} type="integer" onChange={onStepChange} placeholder="#" />
                    </label>
                </div>

                <div className="enter-create-one-direction-div">
                    <label className="one-direction-label">
                        <input value={instruction} type="text" onChange={onDirectionChange} placeholder="Direction" />
                    </label>
                </div>

                <button className="one-direction-submit-button" type="submit"><img className="one-direction-submit-button-icon" src={MyImage} /></button>

            </form>

        </div>
    )

}

export default AddOneDirection;
