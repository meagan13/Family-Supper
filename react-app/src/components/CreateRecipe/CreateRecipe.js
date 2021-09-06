import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
// import { createMemoryThunk } from '../../store/recipe';
import { createRecipeThunk, getRecipes } from '../../store/recipe';
import AddIngredientForm from '../Ingredients/Ingredients';
import CreateDirections from '../CreateDirections/CreateDirections';
// import RecipeView from '../OneRecipe/OneRecipe';
import PreviewRecipe from '../PreviewRecipe/PreviewRecipe';
import './CreateRecipe.css'

const CreateRecipe = () => {
    const sessionUser = useSelector(state => state.session.user);
    // const allRecipes = useSelector(state => Object.values(state?.recipes))

    const recipeInfo = useSelector(state => Object.values(state?.recipes)[Object.values(state.recipes).length - 1]);

    // console.log("All recipes array in CreateRecipe component", allRecipes)
    // console.log("create recipe recipeInfo:", recipeInfo)

    const dispatch = useDispatch();
    // const history = useHistory();

    useEffect(() => {
        dispatch(getRecipes())
    }, [dispatch])


    const [errors, setErrors] = useState([]);
    const [addRecipe, setAddRecipe] = useState(true);
    const [stage, setStage] = useState(1);
    const [showNext, setShowNext] = useState(false);
    // const [viewPreview, setViewPreview] = useState(false);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [food_img, setFood_img] = useState('');
    const [card_img, setCard_img] = useState('');
    const [category_id, setCategory_id] = useState('0');

    const createTitle = (e) => setTitle(e.target.value);
    const createAuthor = (e) => setAuthor(e.target.value);
    const createDescription = (e) => setDescription(e.target.value);
    const createFoodImg = (e) => setFood_img(e.target.value);
    const createCardImg = (e) => setCard_img(e.target.value);
    const createCategory_id = (e) => setCategory_id(Number(e.target.value));

    // console.log("STAGE:", stage);

    useEffect(() => {
        // console.log("Stage is:", stage)
        if(stage > 1) {
            setShowNext(false)
            // console.log("Setting stage")
        }
    }, [stage])

    const handleSubmit = async(e) => {
        e.preventDefault();
        const errorData = [];

        if(title === '') {
            errorData.push('Please include a recipe title.')
        }

        if(title.length > 100) {
            errorData.push('Recipe title can be no longer than 100 characters.')
        }

        if(author === '') {
            errorData.push("Please include the recipe author's name.")
        }

        if(author.length > 50) {
            errorData.push('Recipe author can be no longer than 50 characters.')
        }

        if(description === '') {
            errorData.push('Please include a description of this recipe.')
        }

        if(description.length > 200) {
            errorData.push('Recipe description can be no longer than 200 characters.')
        }

        if(food_img === '') {
            errorData.push('Please include a link to an image of this food item, or enter NA.')
        }

        // if(!food_img.includes('.png') || !food_img.includes('.jpg')) {
        //     errorData.push('Please include a link to an image of this food item.')
        // }

        if(card_img === '') {
            errorData.push('Please include a link to an image of the recipe card, or enter NA.')
        }

        // if(!card_img.includes('.png') || !card_img.includes('.jpg')) {
        //     errorData.push('Please include a .jpg/.png link to an image of the recipe card item.')
        // }

        if(category_id === '0') {
            errorData.push('Please select a category for this recipe.')
        }

        setErrors(errorData);

        if(errorData.length === 0) {
            // console.log("Inside the create recipe handlesubmit")

            setShowNext(true);
            setAddRecipe(false);

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
            setTitle(`Submitted: ${title}`);
            setAuthor(`Submitted: ${author}`);
            setDescription(`Submitted: ${description}`);
            setFood_img(`Submitted: ${food_img}`);
            setCard_img(`Submitted: ${card_img}`);
            setCategory_id("9");

        }

    }

    const nextStage = async() => {
        // console.log("stage after next:", stage)
        await setStage(stage + 1);
    }

    // const previousStage = async() => {
    //     // console.log("stage after previeous:", stage)
    //     await setStage(stage - 1);
    // }

    // const previewRecipe = () => {
    //     // console.log("stage after previeous:", stage)
    //     setViewPreview(!viewPreview)
    // }

    let formDOM = (
        <form className="recipe-form" onSubmit={handleSubmit}>

        <div className="create-recipe-errors-div">
            {errors.map((error, i) => (
            <div key={i}><p>{error}</p></div>
            ))}
        </div>

        <div className="create-recipe-template-intro-div">
            <h1 className="create-recipe-template-intro-text">Let's get started!</h1>
            <h3 className="create-recipe-template-instruct-text">Enter your recipe's basic information and then click <strong>Add Recipe Info.</strong></h3>
            <h3 className="create-recipe-click-next-text">Click next when you're ready to add ingredients!</h3>
        </div>

        <div className="recipe-info-div">
            <div className="title-div input-div">
                <label className="title">
                    <input className="input-test" type="text" value={title} onChange={createTitle} placeholder="Recipe name" />
                </label>
            </div>

            <div className="author-div input-div">
                <label className="author">
                    <input type="text" value={author} onChange={createAuthor} placeholder="From the kitchen of" />
                </label>
            </div>

            <div className="description-div input-div">
                <label className="description">
                    <input type="textarea" value={description} onChange={createDescription} placeholder="Recipe description" />
                </label>
            </div>

            <div className="recipe-food-img-div input-div">
                <label className="food-img">
                    <input type="text" value={food_img} onChange={createFoodImg} placeholder="Food photo link url (or NA)" />
                </label>
            </div>

            <div className="recipe-card-img-div input-div">
                <label className="card-img">
                    <input type="text" value={card_img} onChange={createCardImg} placeholder="Recipe card photo link url (or NA)" />
                </label>
            </div>

            <div>
                <div className="category-div">
                    {/* <button className="category-dropdown-button">Recipe Category</button> */}
                    {/* <label>Recipe Category</label> */}
                    <div className="category-content-div">
                        <select id="create-recipe-select" className="category-select-list" value={category_id} onChange={createCategory_id}>
                            <option selected disabled hidden value='0'>Select a Recipe Category</option>
                            <option className="test" value='1'>Soups</option>
                            <option className="test" value='2'>Salads</option>
                            <option className="test" value='3'>Appetizers</option>
                            <option value='4'>Cookies</option>
                            <option value='5'>Cakes and Desserts</option>
                            <option value='6'>Muffins and Breads</option>
                            <option value='7'>Vegetables and Sides</option>
                            <option value='8'>Meats</option>
                            <option selected disabled hidden value='9'>Category Submitted!</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
        <button disabled={!addRecipe} className='recipe-submit-button' type='submit'>Add Recipe Info</button>
        </form>
    )

    let createRecipeDOM = (
        <>
            {(stage === 1 && formDOM)}
            {(stage === 2 && <AddIngredientForm recipe={ recipeInfo } setShowNext={setShowNext}/>)}
            {(stage === 3 && <CreateDirections recipe={ recipeInfo } setShowNext={setShowNext}/>)}
            {(stage === 4 && <PreviewRecipe recipe={ recipeInfo } />)}
            {(stage === 5 && <Redirect to='/'/> )}

            {stage < 4 && <button disabled={!showNext} className="next-button" onClick={nextStage}>Next</button>}
            {/* {(stage > 1 && stage < 4) && <button className="previous-button" onClick={previousStage}>Previous</button>} */}
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
