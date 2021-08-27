import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { editRecipeThunk, getOneRecipe, deleteRecipeThunk } from '../../store/recipe';
import { deleteMemoryThunk, getMemoriesByRecipeThunk } from '../../store/memory';
import { getIngredientsByRecipeThunk } from '../../store/ingredient';
import { getDirectionsByRecipeThunk } from '../../store/direction';
import AddMemory from '../Memory/addMemory';
import Memories from '../AllMemories/AllMemories';
import EditMemoryForm from '../EditMemory/EditMemory';
import EditRecipeForm from '../EditRecipe/EditRecipe';
// import AddIngredientForm from '../Ingredients/Ingredients';
import CreateDirections from '../CreateDirections/CreateDirections';
import './OneRecipe.css';

function RecipeView() {
    const sessionUser = useSelector(state => state.session.user)
    const recipes = useSelector((state) => (state?.recipes))
    const ingredients = useSelector((state) => (state?.ingredients))
    const ingredientsArr = Object.values(ingredients)
    const directions = useSelector((state) => (state?.directions))
    const directionsArr = Object.values(directions);
    const memories = useSelector((state) => (state.memories))

    const dispatch = useDispatch();
    const { recipeId } = useParams();

    // console.log("ingredients:", ingredients)
    // console.log("recipes:", recipes)
    // console.log("directions:", directions)

    useEffect(() => {
        dispatch(getOneRecipe(recipeId))
        dispatch(getMemoriesByRecipeThunk(recipeId))
        dispatch(getIngredientsByRecipeThunk(recipeId))
        dispatch(getDirectionsByRecipeThunk(recipeId))
    }, [dispatch, recipeId]);

    const recipeMemoryText = Object.values(memories)?.map(memory => memory.memory_text)

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

        return dispatch(deleteRecipeThunk(recipeIdToDelete))
        .catch(async(res) => {
            await res.josn();
        })
    }


    function userMemoryOptions(sessionUser, memory) {
        if (sessionUser && (sessionUser.id === memory.user_id)) {
            return (
                <>
                    <EditMemoryForm memory={memory} />
                    <button className="delete-memory-button" onClick={(e) => handleDeleteMemory(e, memory.id)}>Delete Memory</button>
                </>
            )
        }
    }

    function userRecipeOptions(sessionUser, recipe) {
        if (sessionUser && (sessionUser.id === recipe.user_id)) {
            return (
                <>
                    <EditRecipeForm recipe={recipe} />
                    <button className="edit-recipe-button" onClick={(e) => handleDeleteRecipe(e, recipe.id)}>Delete Recipe</button>
                </>
            )
        }
    }

    if(sessionUser) {
        sessionMemory = (
            <>
                <h3>Welcome, { sessionUser?.username}! </h3>
                <AddMemory />
                {/* <AddIngredientForm />
                <CreateDirections /> */}
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
            <div>
                <h1>{recipes?.title}</h1>
            </div>

            <div>
                <h3>From the kitchen of {recipes?.author}</h3>
            </div>

            <div>
                <p>{recipes.description}</p>
            </div>

            <div>
                <img src={recipes.food_img} alt="food" className="single-recipe-food-img"/>
                <img src={recipes.card_img} alt="recipe card" className="single-recipe-card-img"/>
            </div>

            <div className="ingredients-list-div">
                <h3>Ingredients:</h3>
                { ingredientsArr.map(ingredient => (
                    <div className="ingredient-div" id={ingredient.id}>
                        { ingredient.amt } { ingredient.measurement_id } { ingredient.ingredient_name }
                    </div>
                ))}
            </div>

            <div className="directions-list-div">
                <h3>Directions:</h3>
                { directionsArr.map(direction => (
                    <div className="direction-div" id={direction.id}>
                        { direction.step_number }. { direction.instruction }
                    </div>
                ))}
            </div>

            { sessionMemory }
            <div>
                { recipes && Object.values(recipes).map(recipe => {
                    { userRecipeOptions(sessionUser, recipe)}

                })}
                {/* <EditRecipeForm /> */}
            </div>

            <div>
                { memories && Object.values(memories).map(memory => (
                    <div className="memories-div" id={memory.id}>
                        <Memories memoryObj={ memory }/>
                        { userMemoryOptions(sessionUser, memory)}
                    </div>
                ))}
            </div>


        </>
    )
}


export default RecipeView;
