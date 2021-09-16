import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { getRecipes } from '../../store/recipe';
import './Categories.css'

function Categories() {
    const dispatch = useDispatch();
    const history = useHistory();

    const [category_id, setCategory_id] = useState('0');

    const recipesArr = Object.values(useSelector(state => state?.recipes))
    const recipesByCategory = recipesArr?.filter(recipe => recipe?.category_id == category_id)

    console.log("recipes by category", recipesByCategory)
    // console.log("recipesArr in Categories", recipesArr)

    useEffect(() => {
        dispatch(getRecipes())
        // {<Redirect to='/categories/1' />}
    }, [dispatch])


    console.log("category_id", category_id)

    const selectCategoryId = (e) => setCategory_id(Number(e.target.value));

    console.log("category Id", category_id)

    const handleChange = async(e) => {
        setCategory_id(e.target.value)
    }

    const handleSubmit = async(e) => {
        e.preventDefault();

        console.log("In the handle submit")
        console.log("categoryId in the handleSubmit", category_id)
        // selectCategoryId(e);

        // history.push(`/categories/${category_id}`)
    }

    return (
        <>
            <div className="categories-page-div">
                <div className="category-select-div">
                    <form className="category-select-form" onSubmit={handleSubmit}>
                        {/* <button className="category-dropdown-button">Recipe Category</button>   */}
                        {/* <label>Recipe Category</label> */}
                        <div className="category-sort-content-div">
                            <select id="create-category-select" className="category-select-list" value={category_id} onChange={handleChange}>
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

                        {/* <input className="category-select-button" type="submit" value="Submit" /> */}

                    </form>
                </div>

                <div className="display-category-recipes-div">
                    { recipesByCategory.map(recipe => (
                        <div className="main-page-recipe-img-title">
                            <div className="food-img-div">
                                <a href={`/recipes/${recipe.id}`} id={recipe.id}>
                                <img className="food-img" alt="food item"
                                    onError={(event) => event.target.setAttribute("src", "https://live.staticflickr.com/65535/51418222296_9c3fcb2090_w.jpg")}
                                    src={ recipe.food_img } />
                                </a>

                            </div>
                            <div className="all-recipes-food-title-div">
                                <h3 className="all-recipes-food-title-text">{recipe.title}</h3>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </>
    )

}

export default Categories;
