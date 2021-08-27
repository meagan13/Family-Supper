import React from 'react';

import './AllMemories.css'

function Memories({memoryObj}) {

    return (
        <>
            {/* <h3>{memoryObj.recipe_id}</h3> */}
            <p>{memoryObj?.memory_text}</p>

        </>
    )

}

export default Memories;
