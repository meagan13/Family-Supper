import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
// import { createMemoryThunk } from '../../store/recipe';
import { createRecipeThunk, getRecipes } from '../../store/recipe';
import AddIngredientForm from '../Ingredients/Ingredients';
import CreateDirections from '../CreateDirections/CreateDirections';
import RecipeView from '../OneRecipe/OneRecipe';
import PreviewRecipe from '../PreviewRecipe/PreviewRecipe';
import './CreateRecipe.css'

const CreateRecipe = () => {
    const sessionUser = useSelector(state => state.session.user);
    const allRecipes = useSelector(state => Object.values(state?.recipes))

    const recipeInfo = useSelector(state => Object.values(state?.recipes)[Object.values(state.recipes).length - 1]);

    // console.log("All recipes array in CreateRecipe component", allRecipes)
    console.log("create recipe recipeInfo:", recipeInfo)

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(getRecipes())
    }, [dispatch])

    const [errors, setErrors] = useState([]);
    const [stage, setStage] = useState(1);
    const [viewPreview, setViewPreview] = useState(false)
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

    // console.log("STAGE:", stage);

    const handleSubmit = async(e) => {
        e.preventDefault();
        const errorData = [];

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
            // console.log("Inside the create recipe handlesubmit")

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
            // history.push("/");
        }

    }

    const nextStage = async() => {
        // console.log("stage after next:", stage)
        await setStage(stage + 1);
    }

    const previousStage = async() => {
        // console.log("stage after previeous:", stage)
        await setStage(stage - 1);
    }

    const previewRecipe = () => {
        // console.log("stage after previeous:", stage)
        setViewPreview(!viewPreview)
    }

    let formDOM = (
        <form className="recipe-form" onSubmit={handleSubmit}>

        <div className="create-recipe-errors-div">
            {errors.map((error, i) => (
            <div key={i}>{error}</div>
            ))}
        </div>

        <div className="create-recipe-template-intro-div">
            <h1 className="create-recipe-template-intro-text">Let's get started!</h1>
            <h3 className="create-recipe-template-instruct-text">Enter your recipe's basic information:</h3>
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
                        <select id="create-recipe-select" className="category-select-list" value={category_id} onChange={createCategory_id}>
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
        <button className='recipe-submit-button' type='submit'>Add Recipe Info</button>
        </form>
    )

    let createRecipeDOM = (
        <>
            {/* ADD ERROR HANDLING */}

            {(stage === 1 && formDOM)}
            {(stage === 2 && <AddIngredientForm recipe={ recipeInfo }/>)}
            {(stage === 3 && <CreateDirections recipe={ recipeInfo } />)}
            {(stage === 4 && <PreviewRecipe recipe={ recipeInfo } />)}
            {(stage === 5 && <Redirect to='/'/> )}
            {/* {formDOM} */}
            {stage < 4 && <button className="next-button" onClick={nextStage}>Next</button>}
            {stage > 1 && <button className="previous-button" onClick={previousStage}>Previous</button>}
            {stage === 5 && <button className="complete-recipe" onClick={nextStage}>Submit Recipe</button>}
        </>
    )

    return (
        <div className="recipe-card-div">
            { createRecipeDOM }
            {/* <button className="preview-recipe-button" onClick={ previewRecipe }>Preview Recipe</button> */}
        </div>
    )
}




export default CreateRecipe;
