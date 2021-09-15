const GET_INGREDIENTS = 'ingredient/GET_INGREDIENTS';
const GET_INGREDIENTS_BY_RECIPE = 'ingredient/GET_INGREDIENTS_BY_RECIPE';
const ADD_INGREDIENT = 'ingredient/ADD_INGREDIENT';
const EDIT_INGREDIENT = 'ingredient/EDIT_INGREDIENT';
const DELETE_INGREDIENT = 'ingredient/DELETE_INGREDIENT';

const loadIngredients = (ingredients) => {
    return {
        type: GET_INGREDIENTS,
        ingredients
    }
}

const loadIngredientsByRecipe = (ingredient) => {
    return {
        type: GET_INGREDIENTS_BY_RECIPE,
        ingredient
    }
}

const addIngredient = (ingredient) => {
    return {
        type: ADD_INGREDIENT,
        ingredient
    }
}

const editIngredient = (ingredient) => {
    return {
        type: EDIT_INGREDIENT,
        ingredient
    }
}

const deleteIngredient = (ingredient) => {
    return {
        type: DELETE_INGREDIENT,
        ingredient
    }
}

export const getIngredients = () => async(dispatch) => {
    const res = await fetch('/api/ingredient/');

    if (res.ok) {
        const ingredients = await res.json();
        await dispatch(loadIngredients(ingredients))
        return res;
    }
}

export const getIngredientsByRecipeThunk = (recipeId) => async(dispatch) => {
    const res = await fetch(`/api/ingredient/recipeId/${ recipeId }/`);
    const { allIngredientsByRecipe } = await res.json();

    if (res.ok) {
        dispatch(loadIngredientsByRecipe(allIngredientsByRecipe))
        return allIngredientsByRecipe
        // dispatch(loadMemoriesByRecipe(recipeMemoryText))
    }

    return allIngredientsByRecipe;
}

export const createIngredientThunk = ingredient => async (dispatch) => {
    // console.log("ingredient in create thunk:", ingredient)

    const response = await fetch(`/api/ingredient/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(ingredient)
    })
    if (response.ok) {
        const newIngredient = await response.json();
        // console.log("new ingredient:", newIngredient)
        dispatch(addIngredient(newIngredient))
    }
    return response
}

export const editIngredientThunk = (ingredient) => async(dispatch) => {
    const res = await fetch(`/api/ingredient/${ ingredient.id }/`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(ingredient)
    })
    if(res.ok) {
        const editedIngredient = await res.json();
        dispatch(editIngredient(editedIngredient));
    }
    return res;
}

export const deleteIngredientThunk = (id) => async(dispatch) => {
    // console.log("in ingredient thunk:", id)
    const res = await fetch(`/api/ingredient/${ id }/`, {
        method: "DELETE",
    })
    if (res.ok) {
        const deletedIngredient = await res.json();
        console.log("deleted ingredient:", deletedIngredient)
        dispatch(deleteIngredient(deletedIngredient.id));
    }
    return res;
}

const initialState = {}

export default function ingredients(state = initialState, action) {
    let newState;
    switch (action.type) {
        case ADD_INGREDIENT: {
            // console.log("Action.ingredient:", action.ingredient)
            // console.log("ingredients from reducer:", action.ingredients)
            return {
                // ...state, ...action.ingredients //Ed's add reducer, for me adds an ingredient as a recipe, doesn't work
                ...state,
                [action.ingredient.recipe_id]: action.ingredient
                // {
                //     // ...state[action.ingredient.recipe_id],
                //     // ingredients:[action.ingredient]
                //     // ingredients: [...state[action.ingredient.recipe_id], action.ingredient.id]
                //     // ingredients: [ ...state[action.ingredient.recipe_id], action.ingredient]
                //     // ingredients: ["string of random text"]
                //     // ingredients:[ingredients.push(action.ingredient)] //this one kind of works
                //     ingredients:[...state[action.ingredient], ...action.ingredient]

                // }
            }
        }
        case EDIT_INGREDIENT: {
            // console.log("Action.ingredient", action.ingredient)
            // newState = { ...state}
            return {
                ...state,
                [action.ingredient.id]: action.ingredient
            }
        }
        case DELETE_INGREDIENT: {
            newState = { ...state }
            delete newState[action.ingredient];
            return newState;
        }
        case GET_INGREDIENTS_BY_RECIPE: {

            return action.ingredient;
        }
        default:
            return state;
    }

}
