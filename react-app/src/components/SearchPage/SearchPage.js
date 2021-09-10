import { useState, useEffect } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import RecipeList from '../RecipeList/RecipeList';

function SearchPage() {
    const [input, setInput] = useState('');
    const [recipeListDefault, setRecipeListDefault] = useState();
    const [recipeList, setRecipeList] = useState();

    const fetchRecipes = async() => {
        return await fetch('/api/recipe/')
            .then(res => res.json())
            .then(recipes => {
                setRecipeList(recipes)
                console.log("recipes from SearchPage:", recipes)
                setRecipeListDefault(recipes)
            });
    }

    const updateInput = async(input) => {
        console.log("recipeListDefault", recipeListDefault)
        const filtered = recipeListDefault.filter(recipe => {
            return recipe.title.toLowerCase().includes(input.toLowerCase())
        })
        setInput(input);
        setRecipeList(filtered);
    }

    useEffect(() => {
        fetchRecipes()
    }, []);


    return (
        <>
            {/* <input
                type="text"
                key="inputKey"
                value={input}
                placeholder={"search recipes"}
                onChange={(e) => updateInput(e.target.value)}
            /> */}
            <SearchBar input={input} onChange={updateInput} />
            <RecipeList recipeList={recipeList}/>
        </>
    );
}

export default SearchPage;
