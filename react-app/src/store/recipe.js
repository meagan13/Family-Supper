const GET_RECIPES = 'recipe/GET_RECIPES';
const GET_ONE_RECIPE = 'recipe/GET_ONE_RECIPE';

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
        console.log("thunk recipe info:", recipeInfo)
        return await dispatch(getOne(recipeInfo));
    }
    return recipeInfo;
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
            newState = { ...state };
            newState = action.recipeInfo;
            return newState;
        }
        default:
            return state;
    }
}
