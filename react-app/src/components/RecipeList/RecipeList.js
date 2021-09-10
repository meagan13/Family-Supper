import React from 'react';
import './RecipeList.css'

const RecipeList = ({recipeList=[]}) => {
    return (
    <>
        { Object.values(recipeList).map((data,index) => {
          if (data) {
            return (
              <>
                <div className="search-recipe-text-div" key={index}>
                    {<a href={`/recipes/${data?.id}`}>{data?.title}</a>}
                </div>
              </>
            )
        }
        return null
      }) }
    </>
  );
}

export default RecipeList;
