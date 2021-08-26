import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOneRecipe } from '../../store/recipe';
import { getMemoriesByRecipeThunk } from '../../store/memory';
import AddMemory from '../Memory/addMemory';
import Memories from '../AllMemories/AllMemories';
import './OneRecipe.css';

function RecipeView() {
    const sessionUser = useSelector(state => state.session.user)
    const recipes = useSelector((state) => Object.values(state?.recipes))
    const memories = useSelector((state) => (state.memories.allMemories))
    const dispatch = useDispatch();
    const { recipeId } = useParams();

    // console.log("session user:", sessionUser)
    // console.log("recipes:", recipes)
    // console.log("recipe id:", recipeId)

    useEffect(() => {
        dispatch(getOneRecipe(recipeId))
        dispatch(getMemoriesByRecipeThunk(recipeId))
    }, [dispatch, recipeId]);

    // console.log("memories in OneRecipe:", memories)

    const recipeMemoryText = memories?.map(memory => memory.memory_text)
    console.log("Text???", recipeMemoryText)

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
            <>
                <h3>Welcome, { sessionUser?.username}! </h3>
                <AddMemory />
            </>
        )
    } else {
        sessionMemory = (
            <>
                <h3>Welcome!</h3>
                <h3>Log in to share a memory of this dish.</h3>
            </>
        )
    }

    return (
        <>
            <h1>Individual Recipe Page</h1>
            { recipes?.recipeId }
            { sessionMemory }
            <div>
                { memories && memories.map(memory => (
                    <div className="memories-div">
                        <Memories memoryObj={ memory }/>
                    </div>
                ))}
            </div>
        </>
    )
}


export default RecipeView;
