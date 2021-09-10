import React from 'react';

const RecipeList = ({recipeList=[]}) => {
    console.log("recipe list", Object.values(recipeList))
    return (
    <>
    { Object.values(recipeList).map((data,index) => {
        if (data) {
          return (
            <div key={index}>
              <li key={data.id}>{data.title}</li>
	    </div>
    	   )
    	 }
    	 return null
    }) }
    </>
  );
}

export default RecipeList;
