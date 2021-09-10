import React from 'react';
import './AllDirections.css'

function Directions({directionObj}) {

    // {console.log("direction object:", directionObj)}
    return (
        <>
            <p>{directionObj?.step_number} {directionObj?.instruction}</p>
        </>
    )
}

export default Directions;
