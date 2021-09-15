import React, { useState, useEffect } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import RecipeList from '../RecipeList/RecipeList';
import './SearchPage.css';

const SearchPage = (props) => {
    const [input, setInput] = useState('');
    const [recipeListDefault, setRecipeListDefault] = useState();
    const [recipeList, setRecipeList] = useState();
    const [categoryList, setCategoryList] = useState();
    const [categoryListDefault, setCategoryListDefault] = useState();

    const fetchData = async () => {
        await fetch('/api/recipe/')
            .then(response => response.json())
            .then(data => {
                setRecipeList(data)
                setRecipeListDefault(data)

                // console.log("recipeListDefault", recipeListDefault.recipes)
            });

        await fetch('/api/categories/')
            .then(res => res.json())
            .then(data => {
                setCategoryList(data)
                setCategoryListDefault(data)
            })
    }

    const updateInput = async (input) => {
        const filteredRecipes = recipeListDefault.recipes?.filter(recipe => {
            // console.log("filtered", filtered)
            return recipe.title.toLowerCase().includes(input.toLowerCase())
        })

        const filteredCategories = categoryListDefault.categories?.filter(category => {
            return category.cat_name.toLowerCase().includes(input.toLowerCase())
        })

        setInput(input)
        setRecipeList(filteredRecipes)
        setCategoryList(filteredCategories)

        if(input === "") {
            setRecipeList("");
        }
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
            <RecipeList recipeList={recipeList} categoryList={categoryList}/>
        </>
    );
}

export default SearchPage
