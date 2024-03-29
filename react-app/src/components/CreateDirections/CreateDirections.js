import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { createDirectionThunk } from '../../store/direction';
import './CreateDirections.css'



const CreateDirections = ({recipe, setShowNext}) => {
    // const sessionUser = useSelector(state => state?.session.user)
    // const allRecipes = useSelector((state) => state?.recipes)
    // const directions = useSelector((state) => state?.directions)

    const dispatch = useDispatch();

    // console.log("Recipe passed to create directions:", recipe) //correct, the original recipe info
    // console.log("allRecipes var from CreateDirections component:", allRecipes) //correct, all recipes that exist
    // console.log("Directions from create directions component:", directions) //correct, the instructions that were added to that recipe

    const [errors, setErrors] = useState([]);
    // const [hideDirButton, setHideDirButton] = useState((true));
    const [step_number, setStep_number] = useState(1);
    // const [recipe_id, setRecipeId] = useState();
    const [instruction, setInstruction] = useState('');

    const onDirectionChange = (e) => {
        setInstruction(e.target.value);
        // setHideDirButton(false);
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

        // console.log("Instruction length:", instruction.length)

        setErrors(errorData);

        if(errorData?.length === 0) {

            setShowNext(true);

            const directions = {
                step_number,
                instruction,
                recipe_id: recipe.id,
            }

            await dispatch(createDirectionThunk(directions))
            setStep_number(step_number + 1);
            setInstruction('');
            // setHideDirButton(true);
            alert(`${step_number}. ${instruction} added to your recipe.`)

            // setInstruction(instruction);
        }
    }

    return (
        <div className="create-directions-div">
            <form className="create-directions-form" onSubmit={handleSubmit}>

                {/* {console.log("errorData:", errors)} */}
                <div className="create-direction-errors-div">
                    {errors?.map((error, i) => (
                    <div key={i}><p>{error}</p></div>
                    ))}

                </div>

                <div className="create-directions-intro-div">
                    <h1 className="create-directions-intro-text">Add directions</h1>
                    <h2 className="create-directions-instruct-text">Add as many directions as you need!</h2>
                    <h4 className='create-directions-instruct-text'>Click <strong>Add Direction</strong> before adding the next step.</h4>
                    <h4 className='create-directions-instruct-text'>Click <strong>Next</strong> when you're ready to submit your recipe.</h4>
                </div>

                {/* <div className="create-step-div-input-div">
                    <label className="step-number">Step Number:
                        <input value={step_number} className="step-input" type="integer" onChange={(e) => setStep_number(e.target.value)} />
                    </label>
                </div> */}

                <div className="create-step-div-input-div">
                    <label className="step-number">Step { step_number }: </label>
                </div>

                <div className="create-direction-input-div">
                    <label className="directions-label">
                        <input value={instruction} type="text" onChange={onDirectionChange} placeholder="Ex: Mix together dry ingredients." />
                    </label>
                </div>

                <button className="direction-submit-button" type="submit">Add Direction</button>

            </form>

        </div>
    )
}

export default CreateDirections;
