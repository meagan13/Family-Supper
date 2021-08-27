import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { editRecipeThunk } from '../../store/recipe';
import './EditRecipe.css'

const EditRecipeForm = (recipe) => {
    const sessionUser = useSelector(state => state.session.user)
    const recipes = ((state) => (state?.recipes))

    console.log("recipes state test:", recipes?.author)
    console.log("Recipe passed to form:", recipe)

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

        console.log("Recipes var in edit recipe component", recipes)

        // console.log("Edit recipe button worked")
        // why is recipe.id undefined??
        const editedRecipe = {
            id: recipe.recipe.id,
            title,
            author,
            description,
            food_img,
            card_img,
            category_id,
            user_id: sessionUser.id
        };
        console.log("Edited recipe payload:", editedRecipe)

        await dispatch(editRecipeThunk(editedRecipe))
        setTitle("");
        setAuthor("");
        setDescription("");
        setFood_img("");
        setCard_img("")
        setCategory_id("")
    }

    return (
        <div className='edit-recipe-form-div'>
            <form className='recipe-form' onSubmit={handleEditSubmit}>
                <div>
                    <label className="edit-recipe edit-recipe-title">Edit Recipe Title
                        <input type="text" value={recipe.title} onChange={createEdTitle}/>
                    </label>
                </div>

                <div>
                    <label className="edit-recipe edit-recipe-author">Edit Author
                        <input type="text" value={recipe.author} onChange={createEdAuthor} />
                    </label>
                </div>

                <div>
                    <label className="edit-recipe edit-recipe-description">Edit Description
                        <input type="text" value={recipe.description} onChange={createEdDescription} />
                    </label>
                </div>

                <div>
                    <label className="edit-recipe edit-recipe-food_img">Edit Food Photo
                        <input type="text" value={recipe.food_img} onChange={createEdFoodImg} />
                    </label>
                </div>

                <div>
                    <label className="edit-recipe edit-recipe-card_img">Edit Recipe Card Photo
                        <input type="text" value={recipe.card_img} onChange={createEdCardImg} />
                    </label>
                </div>

                <div>
                        <label>Recipe Category</label>
                        {/* <div className="recipe-category-list"> */}
                            <select className="category-select-list" value={category_id} onChange={createEdCategory_id}>
                                <option value='1'>Soups</option>
                                <option value='2'>Salads</option>
                                <option value='3'>Appetizers</option>
                                <option value='4'>Cookies</option>
                                <option value='5'>Cakes and Desserts</option>
                                <option value='6'>Muffins and Breads</option>
                                <option value='7'>Vegetables and Sides</option>
                                <option value='8'>Meats</option>
                            </select>
                        {/* </div> */}
                    </div>

                <button className='recipe-edit-button' type='submit'>Edit</button>
            </form>
        </div>
    )
}

export default EditRecipeForm;
