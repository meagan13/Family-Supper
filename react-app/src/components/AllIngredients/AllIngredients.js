import React from 'react';

import './AllIngredients.css'

function Ingredients({ingredientObj}) {

    return (
        <>
            <h3>{ingredientObj.recipe_id}</h3>
            <p>{ingredientObj?.memory_text}</p>

        </>
    )

}

export default Ingredients;
