import React from 'react';

import './AllMemories.css'

function Memories({memoryObj}) {

    return (
        <div className="all-memories-div">
            <div className="memory-div">
                <p className="individual-memory-text">{memoryObj?.memory_text}</p>
            </div>

            <label className="memory-user-label">
                <p className="individual-memory-user-text">- {memoryObj.user_id}</p>
            </label>
        </div>
    )

}

export default Memories;
