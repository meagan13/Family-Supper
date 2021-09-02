import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { createMemoryThunk } from '../../store/memory';
import './addMemory.css'

const AddMemory = () => {
    const sessionUser = useSelector(state => state.session.user);
    const recipeInfo = useSelector(state => state.recipes);

    const dispatch = useDispatch();

    const [errors, setErrors] = useState([])
    const [memory_text, setMemoryText] = useState("");

    const createText = (e) => setMemoryText(e.target.value);

    const handleSubmit = async(e) => {
        e.preventDefault();

        const errorData = [];

        if(memory_text === '') {
            errorData.push('Please add text to share a memory.')
        }

        setErrors(errorData);

        if(errorData.length === 0) {

            const addMemory = {
                user_id: sessionUser.id,
                memory_text,
                recipe_id: recipeInfo.id
            }

            await dispatch(createMemoryThunk(addMemory))
            setMemoryText("");
        }
    }



    return (
        <div className="add-memory-form-div">
            <form className="add-memory-form" onSubmit={handleSubmit}>

                <div className="add-memory-errors-div">
                    {errors.map((error, i) => (
                    <div key={i}>{error}</div>
                    ))}
                </div>

                <div className="add-memory-text-div">
                    <label className="add-memory-text-label">
                        <input className="memory-text" type="text" onChange={createText} value={memory_text} placeholder="Share a memory of this dish!" />
                    </label>
                </div>

                <div className="add-memory-button-div">
                    <button className="memory-submit-button" type="submit">Share</button>
                </div>
            </form>

        </div>
    )
}

export default AddMemory;
