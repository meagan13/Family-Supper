import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
// import { createMemoryThunk } from '../../store/recipe';
import { createRecipeThunk } from '../../store/recipe';
import AddIngredientForm from '../Ingredients/Ingredients';
import CreateDirections from '../CreateDirections/CreateDirections';
import './CreateRecipe.css'

const CreateRecipe = () => {
    const sessionUser = useSelector(state => state.session.user);
    const recipeInfo = useSelector(state => state?.recipes);

    console.log("recipeInfo:", recipeInfo)

    const dispatch = useDispatch();
    const history = useHistory();

    // useEffect(() => {
    //     dispatch(createRecipeThunk())
    // }, [dispatch])

    const [errors, setErrors] = useState([])
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [food_img, setFood_img] = useState('');
    const [card_img, setCard_img] = useState('');
    const [category_id, setCategory_id] = useState('');

    const createTitle = (e) => setTitle(e.target.value);
    const createAuthor = (e) => setAuthor(e.target.value);
    const createDescription = (e) => setDescription(e.target.value);
    const createFoodImg = (e) => setFood_img(e.target.value);
    const createCardImg = (e) => setCard_img(e.target.value);
    const createCategory_id = (e) => setCategory_id(Number(e.target.value));

    const handleSubmit = async(e) => {
        e.preventDefault()
        const errorData =[]
        console.log("Error data array first:", errorData)

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

        console.log("Error data array first:", errorData)
        setErrors(errorData)

        if(errorData.length === 0) {
            console.log("Inside the create recipe handlesubmit")

            const addRecipe = {
                title,
                author,
                description,
                food_img,
                card_img,
                category_id,
                user_id: sessionUser.id //added this
            }

            await dispatch(createRecipeThunk(addRecipe))
            setTitle("");
            setAuthor("");
            setDescription("");
            setFood_img("");
            setCard_img("")
            setCategory_id("")
            history.push("/");
        }

    }

    return (
        <div className="recipe-card-div">
            <form className="recipe-form" onSubmit={handleSubmit}>

                <div className="create-recipe-errors-div">
                    {errors.map((error, i) => (
                    <div key={i}>{error}</div>
                    ))}
                </div>

                <div className="recipe-info-div">
                    <div className="title-div input-div">
                        <label className="title">
                            <input className="input-test" type="text" value={title} onChange={createTitle} placeholder="Recipe name:" />
                        </label>
                    </div>

                    <div className="author-div input-div">
                        <label className="author">
                            <input type="text" value={author} onChange={createAuthor} placeholder="From the kitchen of:" />
                        </label>
                    </div>

                    <div className="description-div input-div">
                        <label className="description">
                            <input type="textarea" value={description} onChange={createDescription} placeholder="Please describe this recipe:" />
                        </label>
                    </div>

                    <div className="recipe-food-img-div input-div">
                        <label className="food-img">
                            <input type="text" value={food_img} onChange={createFoodImg} placeholder="Food photo link:" />
                        </label>
                    </div>

                    <div className="recipe-card-img-div input-div">
                        <label className="card-img">
                            <input type="text" value={card_img} onChange={createCardImg} placeholder="Recipe card photo link:" />
                        </label>
                    </div>

                    <div>
                        <div className="category-div">
                            {/* <button className="category-dropdown-button">Recipe Category</button> */}
                            {/* <label>Recipe Category</label> */}
                            <div className="category-content-div">
                                <select id="select" className="category-select-list" value={category_id} onChange={createCategory_id}>
                                    <option selected disabled hidden>Select a Recipe Category</option>
                                    <option className="test" value='1'>Soups</option>
                                    <option className="test" value='2'>Salads</option>
                                    <option className="test" value='3'>Appetizers</option>
                                    <option value='4'>Cookies</option>
                                    <option value='5'>Cakes and Desserts</option>
                                    <option value='6'>Muffins and Breads</option>
                                    <option value='7'>Vegetables and Sides</option>
                                    <option value='8'>Meats</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <AddIngredientForm recipe={ recipeInfo }/>
                <CreateDirections /> */}

                <button className='recipe-submit-button' type='submit'>Share Recipe</button>
            </form>

        </div>
    )
}

export default CreateRecipe;
