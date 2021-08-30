import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Redirect, useHistory } from 'react-router-dom';
import { editRecipeThunk, getOneRecipe, deleteRecipeThunk } from '../../store/recipe';
import { deleteMemoryThunk, getMemoriesByRecipeThunk } from '../../store/memory';
import { getIngredientsByRecipeThunk } from '../../store/ingredient';
import { getDirectionsByRecipeThunk } from '../../store/direction';
import AddMemory from '../Memory/addMemory';
import Memories from '../AllMemories/AllMemories';
import EditMemoryForm from '../EditMemory/EditMemory';
import EditRecipeForm from '../EditRecipe/EditRecipe';
import AddIngredientForm from '../Ingredients/Ingredients';
import EditIngredientsForm from '../EditIngredients/EditIngredients';
import CreateDirections from '../CreateDirections/CreateDirections';
import { compose } from 'redux';
// import './OneRecipe.css';

function PreviewRecipe(recipeInfo) {
    let { recipeId } = useParams();

    if(recipeInfo) {
        recipeId = recipeInfo.recipe.id;
    }

    const sessionUser = useSelector(state => state.session.user)
    const currentRecipe = useSelector((state) => (state?.recipes))[recipeId]
    const ingredients = useSelector((state) => (state?.ingredients))
    const ingredientsArr = Object.values(ingredients)
    const directions = useSelector((state) => (state?.directions))
    const directionsArr = Object.values(directions);
    const memories = useSelector((state) => (state.memories))

    const dispatch = useDispatch();

    console.log("Recipe Info from Preview:", recipeInfo)
    console.log("recipeId in Preview:", recipeId)
    // console.log("Preview Recipe Id:", recipeId)

    // const { recipeId } = useParams();
    const history = useHistory();

    // console.log("ingredients:", ingredients)
    console.log("recipe:", currentRecipe)
    // console.log("directions:", directions)

    useEffect(() => {
        // dispatch(getOneRecipe(recipeId))
        // dispatch(getMemoriesByRecipeThunk(recipeId))
        dispatch(getIngredientsByRecipeThunk(recipeId))
        dispatch(getDirectionsByRecipeThunk(recipeId))
    }, [dispatch, recipeId, recipeInfo]);

    // const recipeMemoryText = Object.values(memories)?.map(memory => memory.memory_text)

    let sessionMemory;

    const handleDeleteMemory = async(e, memoryIdToDelete) => {
        e.preventDefault();

        return dispatch(deleteMemoryThunk(memoryIdToDelete))
            .catch(async(res) => {
                await res.json();
            });
    }

    const handleDeleteRecipe = async(e, recipeIdToDelete) => {
        e.preventDefault();

        dispatch(deleteRecipeThunk(recipeIdToDelete))
            .catch(async(res) => {
                await res.json();
            })

        history.push("/")
    }


    function userMemoryOptions(sessionUser, memory) {
        if (sessionUser && (sessionUser?.id === memory?.user_id)) {
            return (
                <>
                    <EditMemoryForm memory={memory} />
                    <button className="delete-memory-button" onClick={(e) => handleDeleteMemory(e, memory?.id)}>Delete Memory</button>
                </>
            )
        }
    }

    function userRecipeOptions(sessionUser, recipe) {
        if (sessionUser && (sessionUser?.id === recipe?.user_id)) {
            return (
                <div className="edit-and-delete-recipe-div">
                    <EditRecipeForm recipe={ currentRecipe } />
                    {/* <EditIngredientsForm recipe={ currentRecipe } /> */}
                    <button className="edit-recipe-button" onClick={(e) => handleDeleteRecipe(e, recipe?.id)}>Delete Recipe</button>
                </div>
            )
        }
    }

    if(sessionUser) {
        sessionMemory = (
            <>
                <AddMemory />
                {/* <AddIngredientForm />
                <CreateDirections /> */}
            </>
        )

    } else {
        sessionMemory = (
            <div className="login-to-share-memory-div">
                <h3 className="login-to-share-memory-text">Log in to share a memory of this dish.</h3>
            </div>
        )
    }

    return (
        <>
            { recipeInfo && recipeInfo?.recipe.title }
            <h1>Test</h1>
        </>
    )
}


export default PreviewRecipe;
