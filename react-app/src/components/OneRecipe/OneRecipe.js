import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOneRecipe } from '../../store/recipe';
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

    return (
        <>
            <h1>Test</h1>
            { recipes?.recipeId }
            { sessionUser?.username}

        </>
    )
}


export default RecipeView;
