import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { createMemoryThunk, editMemoryThunk, deleteMemoryThunk } from '../../store/memory';
import './addMemory.css'

const AddMemory = () => {
    const sessionUser = useSelector(state => state.session.user);
    const recipeInfo = useSelector(state => state.recipes);

    const dispatch = useDispatch();

    const [memory_text, setMemoryText] = useState("");

    const createText = (e) => setMemoryText(e.target.value);

    const handleSubmit = async(e) => {
        e.preventDefault();

        const addMemory = {
            user_id: sessionUser.id,
            memory_text,
            recipe_id: recipeInfo.id
        }

        await dispatch(createMemoryThunk(addMemory))
        setMemoryText("");
    }



    return (
        <div className="add-memory-form-div">
            <form className="memory-form" onSubmit={handleSubmit}>
                <label className="memory-text-label">
                    <input className="memory-text" type="text" onChange={createText} value={memory_text} placeholder="Share a memory of this dish!" />
                </label>

                <button className="memory-submit-button" type="submit">Share</button>
            </form>

        </div>
    )
}

export default AddMemory;
