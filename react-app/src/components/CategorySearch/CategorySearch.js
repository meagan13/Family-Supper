import { useState } from 'react';

function Categories() {
    const [recipeList, setRecipeList] = useState();

    const fetchRecipesByCategory = async() => {
        return await fetch('/api/recipe/')
            .then(res => res.json())
            .then(recipes => {
                setRecipeList(recipes)
                console.log("recipes from CategorySearch:", recipes)
            });
    }

    // const recipesByCategory = async() => {
    //     const filtered = recipeList.filter(recipe => {
    //         return recipe.
    //     })
    // }

    useEffect(() => {
        fetchRecipes()
    }, []);

}

export default Categories;
