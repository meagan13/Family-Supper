import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { getOneRecipe, deleteRecipeThunk } from '../../store/recipe';
import { deleteMemoryThunk, getMemoriesByRecipeThunk } from '../../store/memory';
import { getIngredientsByRecipeThunk, deleteIngredientThunk } from '../../store/ingredient';
import { getDirectionsByRecipeThunk, deleteDirectionThunk } from '../../store/direction';
import AddMemory from '../Memory/addMemory';
import Memories from '../AllMemories/AllMemories';
import EditMemoryForm from '../EditMemory/EditMemory';
import EditRecipeForm from '../EditRecipe/EditRecipe';
import Ingredients from '../AllIngredients/AllIngredients';
// import AddIngredientForm from '../Ingredients/Ingredients';
import EditIngredientsForm from '../EditIngredients/EditIngredients';
import EditDirectionsForm from '../EditDirections/EditDirections';
// import CreateDirections from '../CreateDirections/CreateDirections';
import Directions from '../AllDirections/AllDirections';
import './OneRecipe.css';

function RecipeView({recipeInfo}) {
    const sessionUser = useSelector(state => state.session.user)
    const currentRecipe = useSelector((state) => (state?.recipes))
    const ingredients = useSelector((state) => (state?.ingredients))
    const ingredientsArr = Object.values(ingredients)
    const directions = useSelector((state) => (state?.directions))
    const directionsArr = Object.values(directions);
    const memories = useSelector((state) => (state?.memories))

    let { recipeId } = useParams();

    const dispatch = useDispatch();
    if(recipeInfo) {
        recipeId = recipeInfo?.id;
    }

    const [showEdit, setShowEdit] = useState(false)

    // console.log("Recipe Id:", recipeId)

    // const { recipeId } = useParams();
    const history = useHistory();

    // console.log("recipe view ingredients:", ingredients)
    // console.log("recipes:", currentRecipe)
    // console.log("directions:", directions)

    useEffect(() => {
        dispatch(getOneRecipe(recipeId))
        dispatch(getMemoriesByRecipeThunk(recipeId))
        dispatch(getIngredientsByRecipeThunk(recipeId))
        dispatch(getDirectionsByRecipeThunk(recipeId))
    }, [dispatch, recipeId]);

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

    const deleteIngredient = async(e, ingredientIdToDelete) => {
        e.preventDefault();

        return dispatch(deleteIngredientThunk(ingredientIdToDelete))
            .catch(async(res) => {
                await res.json();
            });
    }

    const deleteDirection = async(e, directionIdToDelete) => {
        e.preventDefault();

        return dispatch(deleteDirectionThunk(directionIdToDelete))
            .catch(async(res) => {
                await res.json();
            });
    }

    const showEditClick = () => setShowEdit(true);
    const hideEditClick = () => setShowEdit(false);

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
                <div className="click-edit-div">
                    <div className="edit-recipe-button-div">
                        <button className="edit-recipe-button" onClick={showEditClick}>Edit Recipe</button>
                    </div>

                    {showEdit ?
                        <div className="edit-and-delete-recipe-div">
                            <div className="close-recipe-edit-button-div">
                                <button className="edit-recipe-button" onClick={hideEditClick}>Close</button>
                            </div>

                            <div className="one-recipe-edit-recipe-form-div">
                                <EditRecipeForm recipe={ currentRecipe } />
                            </div>

                            <div className="one-recipe-edit-ingredient-form-div">
                                {ingredientsArr?.map((ingredient, i) => {
                                    return <div>
                                        {/* {ingredient?.ingredient_name}
                                        <h2>Nothing rendering insiden map</h2> */}
                                        <EditIngredientsForm ingredientObj={ ingredient } />
                                        {/* <button className="delete-ingredient-button" type="submit" onClick={(e) => deleteIngredient(e, ingredient?.id)}>Delete Ingredient</button> */}
                                    </div>
                                })}
                            </div>

                            <div className="one-recipe-edit-directions-form-div">
                                {directionsArr?.map((direction, i) => {
                                    return <div>
                                        <EditDirectionsForm directionObj={ direction } />
                                        {/* <button className="delete-direction-button" type="submit" onClick={(e) => deleteDirection(e, direction?.id)}>Delete Step</button> */}
                                    </div>
                                })}
                            </div>

                            <div className="delete-recipe-button-div">
                                <button className="delete-recipe-button" onClick={(e) => handleDeleteRecipe(e, recipe?.id)}>Delete Recipe</button>
                            </div>


                        </div>
                    : null}
                </div>
            )
        }
    }

    if(sessionUser) {
        sessionMemory = (
            <>
                <AddMemory />
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
        <div className="one-recipe-view-div">
            <div className="recipe-heading-div">
                <div className="recipe-title-div">
                    <h1 className="recipe-title-text">{ currentRecipe?.title }</h1>
                </div>

                <div className="recipe-author-div">
                    <h3 className="recipe-author-text">From the kitchen of { currentRecipe?.author }</h3>
                </div>
            </div>

            <div className="recipe-description-div">
                <p className="recipe-description-text">{ currentRecipe?.description }</p>
            </div>

            <div className="recipe-photos-div">
                <div className="one-recipe-food-img-div">
                    <img
                        onError={(event)=>event.target.setAttribute("src", "https://live.staticflickr.com/65535/51418222296_26d9df4a42_o.jpg")}
                        src={ currentRecipe?.food_img} alt="food" className="single-recipe-food-img"
                    />
                </div>

                <div className="card-img-div">
                    <img
                        onError={(event)=>event.target.setAttribute("src", "https://live.staticflickr.com/65535/51418987519_5c0a973db4_o.jpg") }
                        src={ currentRecipe?.card_img} alt="recipe card" className="single-recipe-card-img"
                    />
                </div>
            </div>

            <div className="one-recipe-ingredient-directions-div">

                <div className="ingredients-list-div">
                    <h3 className="one-recipe-ingredients-title-text">Ingredients:</h3>
                    { ingredients && Object.values(ingredients).map(ingredient => (
                        <div className="ingredient-div" id={ingredient?.id}>
                            <Ingredients ingredientObj={ingredient}/>
                        </div>
                    ))}
                </div>

                <div className="directions-list-div">
                    <h3 className="one-recipe-directions-title-text">Directions:</h3>
                    { directions && Object.values(directions).map(direction => (
                        <div className="direction-div" id={direction.id}>
                            <Directions directionObj={direction} />
                        </div>
                    ))}
                </div>

            </div>

            <div className="edit-full-recipe-div">
                { userRecipeOptions(sessionUser, currentRecipe)}
            </div>

            <div className="session-memory-div">
                { sessionMemory }
            </div>

            <div className="memory-scroll-div">
                { memories && Object.values(memories).map(memory => (
                    <div id="one-recipe-all-memories" className="memories-div" key={memory?.id}>
                        <Memories memoryObj={ memory }/>
                        { userMemoryOptions(sessionUser, memory)}
                    </div>
                ))}
            </div>

        </div>
    )
}


export default RecipeView;
