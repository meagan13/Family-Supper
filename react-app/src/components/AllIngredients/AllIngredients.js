import React from 'react';

import './AllIngredients.css'

function Ingredients({ingredientObj}) {
    // console.log("ingredientObj", ingredientObj)
    return (
        <>
            <p>{ingredientObj?.amt} {ingredientObj?.measurement} {ingredientObj?.ingredient_name}</p>
        </>
    )

}

export default Ingredients;
