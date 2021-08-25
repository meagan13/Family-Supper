import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRecipes } from '../../store/recipe';
import './Home.css'

function HomePage() {
    const dispatch = useDispatch()

    const recipes = useSelector(state = Object.values(state.recipes))

    useEffect(() => {
        dispatch(getRecipes())
    }, [dispatch]);

    return (
        <>
            { recipes.map(recipe => (
                <a href={`/recipes/${recipe.id}`} id={recipe.id}></a>
            ))}
        </>
    )
}

export default HomePage;
