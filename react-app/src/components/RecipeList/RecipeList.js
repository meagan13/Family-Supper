import React from 'react';
import './RecipeList.css'

const RecipeList = ({recipeList=[]}) => {
    return (
    <>
      <div>
        {/* <button className="dropdown-button">Search Test</button> */}
        <div className>
          { Object.values(recipeList).map((data,index) => {
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
        </div>
      </div>
    </>
  );
}

export default RecipeList;
