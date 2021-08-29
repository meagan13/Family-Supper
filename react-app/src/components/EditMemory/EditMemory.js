import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { editMemoryThunk } from '../../store/memory'
import './EditMemory.css';

const EditMemoryForm = (memory) => {
    const sessionUser = useSelector(state => state.session.user)
    // const memories = useSelector((state) => state.memories)
    // console.log("memories:", memories)
    const dispatch = useDispatch();

    const [editedContent, setEditedContent] = useState();

    const createEditedMemory = (e) => setEditedContent(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        memory = memory.memory
        const editedMemory = {
           id: memory.id,
           user_id: sessionUser.id,
           memory_text: editedContent + " (edited)",
           recipe_id: memory.recipe_id
        };
        await dispatch(editMemoryThunk(editedMemory))

    };

    return (
        <div id="edit-memory-form-div" className='memory-form-div'>
            <form className='memory-form' onSubmit={handleSubmit}>
                <label className="edit-memory-label-text">
                    <input className="edit-memory-input" type="text" onChange={createEditedMemory}/>
                </label>

                <button className='memory-edit-button' type='submit'>Edit Memory</button>
            </form>
        </div>
    )
}

export default EditMemoryForm;
