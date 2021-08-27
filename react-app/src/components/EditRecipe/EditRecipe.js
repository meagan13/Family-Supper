import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { editRecipeThunk } from '../../store/recipe';
import './EditRecipe.css'

const EditRecipeForm = (recipe) => {
    const sessionUser = useSelector(state => state.session.user)
    const recipes = ((state) => state.recipes)

    const dispatch=useDispatch()

    const [title, setTitle] = useState();
    const [author, setAuthor] = useState();
    const [description, setDescription] = useState();
    const [food_img, setFood_img] = useState();
    const [card_img, setCard_img] = useState();
    const [category_id, setCategory_id] = useState();

    const createEdTitle = (e) => setTitle(e.target.value);
    const createEdAuthor = (e) => setAuthor(e.target.value);
    const createEdDescription = (e) => setDescription(e.target.value);
    const createEdFoodImg = (e) => setFood_img(e.target.value);
    const createEdCardImg = (e) => setCard_img(e.target.value);
    const createEdCategory_id = (e) => setCategory_id(Number(e.target.value));

    const handleEditSubmit = async(e) => {
        e.preventDefault();

        const editedRecipe = {
            title,
            author,
            description,
            food_img,
            card_img,
            category_id,
            user_id: sessionUser.id
        };

        await dispatch(editRecipeThunk(editedRecipe))
    }

    return (
        <div className='edit-recipe-form-div'>
        <form className='recipe-form' onSubmit={handleEditSubmit}>
            <label className="edit-recipe">Edit Recipe
                <input type="text" value={recipe.title} onChange={createEdTitle}/>
            </label>

            <button className='recipe-edit-button' type='submit'>Edit</button>
        </form>
    </div>
    )
}

export default EditRecipeForm;
