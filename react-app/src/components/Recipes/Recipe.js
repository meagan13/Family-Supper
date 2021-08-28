import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRecipes } from '../../store/recipe';
import Memories from '../AllMemories/AllMemories';
import './Recipe.css'

function Recipes() {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const recipes = useSelector((state) => Object.values(state?.recipes))
    // const recipes = useSelector(state => state?.recipes)

    let sessionRecipe;

    useEffect(() => {
        dispatch(getRecipes())
    }, [dispatch])

    // console.log("recipes:", recipes)

    if(sessionUser) {
        sessionRecipe = (
            <>
                <h1 className="recipes-main-text">{ sessionUser?.username}'s Family Recipes </h1>
            </>
        )
    } else {
        sessionRecipe = (
            <>
                <h1 className="recipes-main-text">Recipes</h1>
            </>
        )
    }

    return (
        <>
            <div className="home-header-imgs">
                <img src="https://live.staticflickr.com/65535/51409699700_833a58826f_z.jpg" alt="cooking ingredients" />
                <img src="https://live.staticflickr.com/65535/51409483114_f004083a80_z.jpg" alt="memory book" />
                <img src="https://live.staticflickr.com/65535/51408719636_d33837d9b8_z.jpg" alt="multi generational hands" />
            </div>

            <div className="motto-div">
                <h3 className="motto-text">Where families share meals and memories.</h3>
            </div>

            <div className="recipes-title-div">
                { sessionRecipe }
            </div>

            <div className="all-recipes-div">
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
