import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { editRecipeThunk } from '../../store/recipe';
import { useHistory } from 'react-router-dom';
import './EditRecipe.css'

const EditRecipeForm = (recipe) => {
    const sessionUser = useSelector(state => state.session.user)
    const recipes = ((state) => (state?.recipes))

    // console.log("recipes state test:", recipes?.author)
    // console.log("Recipe passed to form:", recipe)
    // console.log("Recipe title:", recipe?.recipe.title)

    const dispatch=useDispatch();
    const history = useHistory();

    const [errors, setErrors] = useState([]);
    const [title, setTitle] = useState(recipe.recipe.title);
    const [author, setAuthor] = useState(recipe.recipe.author);
    const [description, setDescription] = useState(recipe.recipe.description);
    const [food_img, setFood_img] = useState(recipe.recipe.food_img);
    const [card_img, setCard_img] = useState(recipe.recipe.card_img);
    const [category_id, setCategory_id] = useState(recipe.recipe.category_id);

    const createEdTitle = (e) => setTitle(e.target.value);
    const createEdAuthor = (e) => setAuthor(e.target.value);
    const createEdDescription = (e) => setDescription(e.target.value);
    const createEdFoodImg = (e) => setFood_img(e.target.value);
    const createEdCardImg = (e) => setCard_img(e.target.value);
    const createEdCategory_id = (e) => setCategory_id(Number(e.target.value));

    const handleEditSubmit = async(e) => {
        e.preventDefault();
        const errorData = [];

        // console.log("Recipes var in edit recipe component", recipes)

        // console.log("Edit recipe button worked")
        if(title === '') {
            errorData.push('Please include a recipe title.')
        }

        if(author === '') {
            errorData.push("Please include the recipe author's name.")
        }

        if(description === '') {
            errorData.push('Please include a description of this recipe.')
        }

        if(food_img === '') {
            errorData.push('Please include a link to an image of this recipe.')
        }

        if(card_img === '') {
            errorData.push('Please include a link to an image of the recipe card.')
        }

        if(category_id === '') {
            errorData.push('Please select a category for this recipe.')
        }

        setErrors(errorData);

        if(errorData.length === 0) {
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
            // console.log("Edited recipe payload:", editedRecipe)

            await dispatch(editRecipeThunk(editedRecipe))
            setTitle(title);
            setAuthor(author);
            setDescription(description);
            setFood_img(food_img);
            setCard_img(card_img)
            setCategory_id(category_id)
            history.push(`/recipes/${ recipe.recipe.id }/`)
        }
    }

    return (
        <div className='edit-recipe-form-div'>
            <form className='recipe-form' onSubmit={handleEditSubmit}>
                <div className="edit-recipe-errors-div">
                    {errors.map((error, i) => (
                    <div key={i}>{error}</div>
                    ))}
                </div>

                <div>
                    <label className="edit-recipe edit-recipe-title">Edit Recipe Title
                        <input type="text" value={title} onChange={createEdTitle}/>
                    </label>
                </div>

                <div>
                    <label className="edit-recipe edit-recipe-author">Edit Author
                        <input type="text" value={author} onChange={createEdAuthor} />
                    </label>
                </div>

                <div>
                    <label className="edit-recipe edit-recipe-description">Edit Description
                        <input type="text" value={description} onChange={createEdDescription} />
                    </label>
                </div>

                <div>
                    <label className="edit-recipe edit-recipe-food_img">Edit Food Photo
                        <input type="text" value={food_img} onChange={createEdFoodImg} />
                    </label>
                </div>

                <div>
                    <label className="edit-recipe edit-recipe-card_img">Edit Recipe Card Photo
                        <input type="text" value={card_img} onChange={createEdCardImg} />
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

                <button className='recipe-edit-button' type='submit'>Edit Recipe</button>
            </form>
        </div>
    )
}

export default EditRecipeForm;
