import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { getOneRecipe } from '../../store/recipe';
import { getMemoriesByRecipeThunk } from '../../store/memory';
import { getIngredientsByRecipeThunk } from '../../store/ingredient';
import { getDirectionsByRecipeThunk } from '../../store/direction';
// import AddMemory from '../Memory/addMemory';
// import Memories from '../AllMemories/AllMemories';
// import EditMemoryForm from '../EditMemory/EditMemory';
// import EditRecipeForm from '../EditRecipe/EditRecipe';
// import AddIngredientForm from '../Ingredients/Ingredients';
// import EditIngredientsForm from '../EditIngredients/EditIngredients';
// import CreateDirections from '../CreateDirections/CreateDirections';
// import { compose } from 'redux';
import './PreviewRecipe.css';

//recipeInfo

function PreviewRecipe({ recipe }) {
    let { recipeId } = useParams();

    if(recipe) {
        recipeId = recipe.id;
    }

    // const sessionUser = useSelector(state => state.session.user)
    // const currentRecipe = useSelector((state) => (state?.recipes))[recipeId]
    // const ingredients = useSelector((state) => (state?.ingredients))
    // const ingredientsArr = Object.values(ingredients)
    // const directions = useSelector((state) => (state?.directions))
    // const directionsArr = Object.values(directions);
    // const memories = useSelector((state) => (state.memories))

    const dispatch = useDispatch();

    // console.log("Recipe prop passed into Preview:", recipe)
    // console.log("recipeId in Preview:", recipeId)
    // console.log("Preview Recipe Id:", recipeId)
    // console.log("Directions from preivew recipe:", directions)
    // console.log("Directions array:", directionsArr)

    // const { recipeId } = useParams();
    const history = useHistory();

    // console.log("preview ingredients:", ingredients)
    // console.log("current recipe:", currentRecipe)
    // console.log("preview directions:", directions)

    useEffect(() => {
        dispatch(getOneRecipe(recipeId))
        dispatch(getMemoriesByRecipeThunk(recipeId))
        dispatch(getIngredientsByRecipeThunk(recipeId))
        dispatch(getDirectionsByRecipeThunk(recipeId))
    }, [dispatch, recipeId]);

    // const recipeMemoryText = Object.values(memories)?.map(memory => memory.memory_text)

    // let sessionMemory;

    // const handleDeleteMemory = async(e, memoryIdToDelete) => {
    //     e.preventDefault();

    //     return dispatch(deleteMemoryThunk(memoryIdToDelete))
    //         .catch(async(res) => {
    //             await res.json();
    //         });
    // }

    // const handleDeleteRecipe = async(e, recipeIdToDelete) => {
    //     e.preventDefault();

    //     dispatch(deleteRecipeThunk(recipeIdToDelete))
    //         .catch(async(res) => {
    //             await res.json();
    //         })

    //     history.push("/")
    // }

    const handleHome = async(e) => {
        e.preventDefault();

        history.push('/');
    }

    // function userMemoryOptions(sessionUser, memory) {
    //     if (sessionUser && (sessionUser?.id === memory?.user_id)) {
    //         return (
    //             <>
    //                 <EditMemoryForm memory={memory} />
    //                 <button className="delete-memory-button" onClick={(e) => handleDeleteMemory(e, memory?.id)}>Delete Memory</button>
    //             </>
    //         )
    //     }
    // }

    // function userRecipeOptions(sessionUser, recipe) {
    //     if (sessionUser && (sessionUser?.id === recipe?.user_id)) {
    //         return (
    //             <div className="edit-and-delete-recipe-div">
    //                 <EditRecipeForm recipe={ currentRecipe } />
    //                 {/* <EditIngredientsForm recipe={ currentRecipe } /> */}
    //                 <button className="edit-recipe-button" onClick={(e) => handleDeleteRecipe(e, recipe?.id)}>Delete Recipe</button>
    //             </div>
    //         )
    //     }
    // }

    // if(sessionUser) {
    //     sessionMemory = (
    //         <>
    //             <AddMemory />
    //             {/* <AddIngredientForm />
    //             <CreateDirections /> */}
    //         </>
    //     )

    // } else {
    //     sessionMemory = (
    //         <div className="login-to-share-memory-div">
    //             <h3 className="login-to-share-memory-text">Log in to share a memory of this dish.</h3>
    //         </div>
    //     )
    // }

    return (
        <>
            <div className="preview-div">
                <div className="recipe-added-message-div">
                    <h1 className="recipe-added-message-text">Your recipe has been added!</h1>
                </div>

                <div className="return-home-button-div">
                    <button className="return-home-button" onClick={handleHome}>Close</button>
                    {/* <h3>Click next to complete your recipe submission.</h3>
                    <p>Click previous to review your submission first.</p> */}
                </div>

                {/* <div className="preview-title-div">
                    <h1>{ recipe && recipe?.title }</h1>
                    <h2>From the kitchen of {recipe?.author}</h2>
                </div>

                <div className="preview-ingredients-div">
                    <h3>Ingredients:</h3>
                    { Object.values(ingredients).map(ingredient => (
                        <div className="preview-ingredient-div">
                            {ingredient.amt} {ingredient.measurement} { ingredient.ingredient_name}
                        </div>
                    ))}
                </div>

                <div className="preview-directions-div">
                    <h3>Directions:</h3>
                    { Object.values(directions).map(direction => {
                        <div className="preview-directions-div">
                            {direction?.id.step_number} {direction?.id.instruction}
                        </div>
                    })}
                </div> */}

            </div>
        </>
    )
}


export default PreviewRecipe;
