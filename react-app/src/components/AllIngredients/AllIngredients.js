import React from 'react';

import './AllIngredients.css'

function Ingredients({ingredientObj}) {
    // console.log("ingredientObj", ingredientObj)
    return (
        <>
            <p className="one-recipe-ing-dir-text">{ingredientObj?.amt} {ingredientObj?.measurement} {ingredientObj?.ingredient_name}</p>
        </>
    )

}

export default Ingredients;
