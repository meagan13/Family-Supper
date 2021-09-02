import React from 'react';
import { useSelector } from 'react-redux';

import './AllMemories.css'

function Memories({memoryObj}) {

    // console.log("AllMemories memoryObj:", memoryObj)

    // const currentRecipe = useSelector(state => state?.recipes)
    // const users = useSelector((state) => state?.users)

    // console.log("users from memories:", users)
    // console.log("currentRecipe from AllMemories:", currentRecipe)

    return (
        <div className="all-memories-div">
            <div className="memory-div">
                <p className="individual-memory-text">{memoryObj?.memory_text}</p>
            </div>

            {/* <label className="memory-user-label">
                <p className="individual-memory-user-text">- {memoryObj.user_id}</p>
            </label> */}

        </div>
    )

}

export default Memories;
