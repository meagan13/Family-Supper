import React from 'react';
import './RecipeList.css'

const RecipeList = ({recipeList=[]}, {categoryList=[]}) => {
    return (
    <>
      <div>
        {/* <button className="dropdown-button">Search Test</button> */}
        <div className="search-results-div">
          { Object.values(recipeList).map((data, index) => {
              if (data) {
                return (
                  <>
                    <div className="search-recipe-text-div navbar-text" key={index}>
                        {<a href={`/recipes/${data?.id}`}>{data?.title}</a>}
                    </div>
                  </>
                )
            }
            return null
          }) }

          { Object.values(categoryList).map((data, index) => {
            if(data) {
              return (
                <>
                  <div className="search-categories-text-div navbar-text" key={index}>
                        {<a href={`/categories/${data?.id}`}>{data?.cat_name}</a>}
                  </div>
                </>
              )
            }
          })}
        </div>
      </div>
    </>
  );
}

export default RecipeList;
