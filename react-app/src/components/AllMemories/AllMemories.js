import React from 'react';

import './AllMemories.css'

function Memories({memoryObj}) {

    return (
        <div className="all-memories-div">
            <div className="memory-div">
                <p className="individual-memory-text">{memoryObj?.memory_text}</p>
            </div>
        </div>
    )

}

export default Memories;
