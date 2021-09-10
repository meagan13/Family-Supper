import React from 'react';

const RecipeList = ({recipeList=[]}) => {
    console.log("recipe list", Object.values(recipeList))
    return (
    <>
    { Object.values(recipeList).map((data,index) => {
        if (data) {
          return (
            <div key={data?.title}>
              <h1>{data?.title}</h1>
	    </div>
    	   )
    	 }
    	 return null
    }) }
    </>
  );
}

export default RecipeList;
