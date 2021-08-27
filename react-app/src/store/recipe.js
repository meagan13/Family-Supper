const GET_RECIPES = 'recipe/GET_RECIPES';
const GET_ONE_RECIPE = 'recipe/GET_ONE_RECIPE';
const ADD_RECIPE = 'recipe/ADD_RECIPE';
const ADD_INGREDIENT = 'ingredient/ADD_INGREDIENT';

const loadRecipes = (recipes) => {
    return {
        type: GET_RECIPES,
        recipes
    }
}

const getOne = (recipe) => {
    return {
        type: GET_ONE_RECIPE,
        recipe
    }
}

const addIngredient = (ingredient) => ({
    type: ADD_INGREDIENT,
    ingredient
})

const addRecipe = (recipe) => {
    return {
        type: ADD_RECIPE,
        recipe
    }
}

export const getRecipes = () => async(dispatch) => {
    const res = await fetch('/api/recipe/');

    if (res.ok) {
        const recipes = await res.json();
        await dispatch(loadRecipes(recipes));
        return res;
    }

}

export const getOneRecipe = (recipeId) => async(dispatch) => {
    const response = await fetch(`/api/recipe/${recipeId}/`)

    const recipeInfo = await response.json();

    if(response.ok) {
        // console.log("thunk recipe info:", recipeInfo)
        return await dispatch(getOne(recipeInfo));
    }
    return recipeInfo;
}


export const createIngredientThunk = ingredient => async (dispatch) => {
    const response = await fetch(`/api/ingredient/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(ingredient)
    })
    if (response.ok) {
        const newIngredient = await response.json();
        dispatch(addIngredient(newIngredient))
    }
    return response
}

export const createRecipeThunk = (recipe) => async(dispatch) => {
    const response = await fetch('/api/recipe', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(recipe)
    })
    if (response.ok) {
        const newRecipe = await response.json();
        dispatch(addRecipe(newRecipe))
    }
    return response
}

const initialState = {}

export default function recipes(state = initialState, action) {
    let newState;
    switch (action.type) {
        case GET_RECIPES: {
            const allRecipes = {};
            action.recipes.recipes.forEach(recipe => {
                allRecipes[recipe.id] = recipe;
            });
            newState = { ...allRecipes }
            return newState;
        }
        case GET_ONE_RECIPE: {
            newState = action.recipe;
            return newState;
        }
        case ADD_INGREDIENT: {
            newState = {...state};
            newState.ingredients.push(action.ingredient);
            return newState;
        }
        case ADD_RECIPE:{
            return {
                ...state,
                [action.recipe.id]: action.recipe
            }
        }
        default:
            return state;
    }
}
