import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { editMemoryThunk } from '../../store/memory'
import './EditMemory.css';

const EditMemoryForm = (memory) => {
    const sessionUser = useSelector(state => state.session.user)
    // const memories = useSelector((state) => state.memories)
    // console.log("memories:", memories)
    const dispatch = useDispatch();

    const [errors, setErrors] = useState([]);
    const [memory_text, setMemory_text] = useState(memory.memory.memory_text);

    const createEditedMemory = (e) => setMemory_text(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errorData = [];

        if(memory_text === '') {
            errorData.push('Please add text to edit this memory.');
        }

        if(memory_text.length > 150) {
            errorData.push('Memories must be 1-150 characters long.')
        }

        setErrors(errorData)

        if(errorData.length === 0) {
            memory = memory.memory
            const editedMemory = {
               id: memory.id,
               user_id: sessionUser.id,
               memory_text: memory_text + " (edited)",
               recipe_id: memory.recipe_id
            };
            await dispatch(editMemoryThunk(editedMemory))
            setMemory_text(memory_text)
        }

    };

    return (
        <div id="edit-memory-form-div" className='memory-form-div'>
            <form className='memory-form' onSubmit={handleSubmit}>
                <div className="edit-memory-errors-div">
                    {errors.map((error, i) => (
                    <div key={i}>{error}</div>
                    ))}
                </div>

                <label className="edit-memory-label-text">
                    <input value={memory_text} placeholder={memory_text} className="edit-memory-input" type="text" onChange={createEditedMemory}/>
                </label>

                <button className='memory-edit-button' type='submit'>Edit Memory</button>
            </form>
        </div>
    )
}

export default EditMemoryForm;
