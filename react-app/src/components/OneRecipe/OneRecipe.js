import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOneRecipe } from '../../store/recipe';
import AddMemory from '../Memory/addMemory';
import './OneRecipe.css';

function RecipeView() {
    const sessionUser = useSelector(state => state.session.user)
    const recipes = useSelector((state) => Object.values(state?.recipes))

    const dispatch = useDispatch();
    const { recipeId } = useParams();

    console.log("session user:", sessionUser)
    console.log("recipes:", recipes)
    console.log("recipe id:", recipeId)

    useEffect(() => {
        dispatch(getOneRecipe(recipeId))
    }, [dispatch, recipeId]);

    let sessionMemory;

    // function recipeDescription() {
    //     return (
    //         <>
    //             <img src={ recipes.food_img } className="single-food-img" alt="food item"/>
    //             <img src={ recipes.card_img } className="recipe-card-img" alt="recipe card"/>
    //             <h1>{ recipes?.title }</h1>
    //             <h3>{ recipes?.description }</h3>

    //         </>
    //     )
    // }

    if(sessionUser) {
        sessionMemory = (
            <AddMemory />
        )
    } else {
        sessionMemory = (
            <h3>Log in to share a memory of this dish!</h3>
        )
    }

    return (
        <>
            <h1>Individual Recipe Page</h1>
            { recipes?.recipeId }
            <h3>Welcome, { sessionUser?.username}! </h3>
            {sessionMemory}

        </>
    )
}


export default RecipeView;
