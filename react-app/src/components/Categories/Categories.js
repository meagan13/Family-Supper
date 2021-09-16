import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { getRecipes } from '../../store/recipe';

function Categories() {
    const dispatch = useDispatch();
    const history = useHistory();

    const recipesArr = Object.values(useSelector(state => state?.recipes))
    // const recipesByCategory = recipesArr?.filter(recipe => recipe?.category_id == categories?.id)

    // console.log("recipesArr in Categories", recipesArr)

    useEffect(() => {
        dispatch(getRecipes())
        // {<Redirect to='/categories/1' />}
    }, [dispatch])

    const [category_id, setCategory_id] = useState('0');
    const selectCategoryId = (e) => setCategory_id(Number(e.target.value));

    console.log("category Id", category_id)

    const handleCategorySelect = async(e, catId) => {
        e.preventDefault();

        selectCategoryId(catId);

        history.push(`/categories/${category_id}`)
    }

    return (
        <>
            <h1>Test Page for Categories</h1>

            <div>
                <div className="category-div">
                    <form className="category-select-form" onSubmit={handleCategorySelect}>
                        {/* <button className="category-dropdown-button">Recipe Category</button>   */}
                        {/* <label>Recipe Category</label> */}
                        <div className="category-content-div">
                            <select id="create-recipe-select" className="category-select-list" value={category_id} onChange={(e) => handleCategorySelect(e, category_id)}>
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
                    </form>
                </div>
            </div>
        </>
    )

}

export default Categories;
