import { useState, useEffect } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import RecipeList from '../RecipeList/RecipeList';

const SearchPage = (props) => {
    const [input, setInput] = useState('');
    const [recipeListDefault, setRecipeListDefault] = useState();
    const [recipeList, setRecipeList] = useState();

    const fetchRecipes = async() => {
        return await fetch('/api/recipe/')
        .then(res => res.json())
        .then(recipes => {
            setRecipeList(recipes)
            setRecipeListDefault(recipes)
        });
    }

    const updateInput = async (input) => {
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
            <h1>Recipe List</h1>
            <SearchBar input={input} onChange={updateInput} />
            <RecipeList recipeList={recipeList}/>
        </>
    );
}

export default SearchPage;
