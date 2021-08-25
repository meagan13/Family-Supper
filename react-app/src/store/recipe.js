const GET_RECIPES = 'recipe/GET_RECIPES';

const loadRecipes = (recipes) => {
    return {
        type: GET_RECIPES,
        recipes
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
