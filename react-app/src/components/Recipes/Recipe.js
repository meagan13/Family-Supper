import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRecipes } from '../../store/recipe';
import './Recipe.css'

function Recipes() {
    const dispatch = useDispatch()
    // const sessionUser = useSelector(state => state.session.user)
    const recipes = useSelector((state) => Object.values(state?.recipes))
    // const recipes = useSelector(state => state?.recipes)

    useEffect(() => {
        dispatch(getRecipes())
    }, [dispatch])

    console.log("recipes:", recipes)

    return (
        <>
            <div className="all-recipes-div">
                <h1 className="recipes-main-text">Recipes</h1>
                { recipes.map(recipe => (
                    <div className="food-img-div">
                        <a href={`/recipes/${recipe.id}`} id={recipe.id}>
                        <img src={ recipe.food_img } className="food-img" alt="food item" />
                        </a>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Recipes;
