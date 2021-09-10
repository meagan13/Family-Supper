import React, { useState, useEffect } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import RecipeList from '../RecipeList/RecipeList';
import './SearchPage.css';

const SearchPage = (props) => {
    const [input, setInput] = useState('');
    const [recipeListDefault, setRecipeListDefault] = useState();
    const [recipeList, setRecipeList] = useState();

    const fetchData = async () => {
        return await fetch('/api/recipe/')
            .then(response => response.json())
            .then(data => {
                setRecipeList(data)
                setRecipeListDefault(data)

                // console.log("recipeListDefault", recipeListDefault.recipes)
            });
    }

    const updateInput = async (input) => {
        const filtered = recipeListDefault.recipes?.filter(recipe => {
            // console.log("filtered", filtered)
            return recipe.title.toLowerCase().includes(input.toLowerCase())
        })

        setInput(input);
        setRecipeList(filtered);
    }

    useEffect(() => {
        fetchData()
    }, []);

    return (
        <>
            <SearchBar
                input={input}
                onChange={updateInput}
            />
            <RecipeList recipeList={recipeList}/>
        </>
    );
}

export default SearchPage
