import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
// import { createMemoryThunk } from '../../store/recipe';
import AddIngredientForm from '../OneRecipe/Ingredients/Ingredients';
import CreateDirections from '../CreateDirections/CreateDirections';
import './CreateRecipe.css'

const CreateRecipe = () => {
    const sessionUser = useSelector(state => state.session.user);
    const recipeInfo = useSelector(state => state.recipes);

    const dispatch = useDispatch();

    const [title, setTitle] = useState();
    const [author, setAuthor] = useState();
    const [description, setDescription] = useState();
    const [food_img, setFood_img] = useState();
    const [card_img, setCard_img] = useState();
    const [categoryId, setCategoryId] = useState();

    const createTitle = (e) => setTitle(e.target.value);
    const createAuthor = (e) => setAuthor(e.target.value);
    const createDescription = (e) => setDescription(e.target.value);
    const createFoodImg = (e) => setFood_img(e.target.value);
    const createCardImg = (e) => setCard_img(e.target.value);
    const createCategoryId = (e) => setCategoryId(e.target.value);

    const handleSubmit = async(e) => {
        e.preventDefault()

        const addRecipe = {
            title,
            author,
            description,
            food_img,
            card_img,
            categoryId
        }

        // await dispatch(createRecipeThunk(addRecipe))
    }

    return (
        <div>
            <form className="recipe-form" onSubmit={handleSubmit}>
                <div className="recipe-info-div">
                    <label className="title">
                        <input type="text" onChange={createTitle} placeholder="Recipe name:" />
                    </label>

                    <label className="author">
                        <input type="text" onChange={createAuthor} placeholder="From the kitchen of:" />
                    </label>

                    <label className="description">
                        <input type="textarea" onChange={createDescription} placeholder="Please describe this recipe:" />
                    </label>

                    <label className="food-img">
                        <input type="text" onChange={createFoodImg} placeholder="Link to photo of prepared dish:" />
                    </label>

                    <label className="card-img">
                        <input type="text" onChange={createCardImg} placeholder="Link to photo of recipe card:" />
                    </label>

                    <label>Recipe Category</label>
                    <div className="recipe-category-list">
                        <select className="category-select-list" value={categoryId} onChange={createCategoryId}>
                            <option value='1'>Soups</option>
                            <option value='2'>Salads</option>
                            <option value='3'>Appetizers</option>
                            <option value='4'>Cookies</option>
                            <option value='5'>Cakes and Desserts</option>
                            <option value='6'>Muffins and Breads</option>
                            <option value='7'>Vegetables and Sides</option>
                            <option value='8'>Meats</option>
                        </select>
                    </div>
                </div>

                <AddIngredientForm />
                <CreateDirections />

                <button className='recipe-submit-button' type='submit'>Submit</button>
            </form>

        </div>
    )
}

export default CreateRecipe;
