import React from 'react';

const RecipeList = ({recipeList=[]}) => {
    return (
    <>
        { Object.values(recipeList).map((data,index) => {
          if (data) {
            return (
              <>
                <div key={index}>
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
