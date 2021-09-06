import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getMemories } from '../../store/memory';
import { getRecipes } from '../../store/recipe';
import './User.css'

function User() {
  const dispatch = useDispatch();
  const { userId }  = useParams();

  // const recipes = useSelector(state => state?.recipes)
  const recipesArr = Object.values(useSelector(state => state?.recipes))
  const myRecipes = recipesArr?.filter(recipe => recipe?.user_id == userId)


  // const memories = useSelector(state => state?.memories)
  // const memoriesArr = Object.values(useSelector(state => state?.memories))
  // const myMemories = memoriesArr?.filter(memory => memory?.user_id == userId)

  const [user, setUser] = useState({});
  const [bio, setBio] = useState(user.bio)
  // console.log("User bio:", user.bio)

  // console.log("User - recipes:", recipes)
  // console.log("User - recipesArr:", recipesArr)

  // console.log("memories state:", memories)
  // console.log("memories array:", memoriesArr)
  // console.log("user id from useParams:", userId)

  // console.log("recipes in profile:", recipes)
  // console.log("recipes array:", recipesArr)

  let sessionBio;

  useEffect(() => {
    dispatch(getRecipes())
    dispatch(getMemories())
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [dispatch, userId]);

  if (!user) {
    return null;
  }

  if(user.bio) {
    sessionBio = (
      <div className="bio-text-div">
        <h2 className="bio-text"><strong>About me:</strong> { user.bio }</h2>
      </div>
    )
  }
  // console.log("User - My recipes:", myRecipes)

  return (

    <div className="profile-div">
        <div className="profile-pic-name-div">
          <img className="profile-img"
            onError={(event) => event.target.setAttribute("src", "https://image.pngaaa.com/189/734189-middle.png")}
            src={ user.imgUrl } alt="user profile" />
          {/* <img className="profile-img" src="https://live.staticflickr.com/65535/50951145667_870fc85517_z.jpg" alt="placeholder" /> */}

          <h3 className="username-text">
            { user.username }
          </h3>
        </div>


        <div className="user-info-div">
          <p className="email-text">
            <strong>Email:</strong> { user.email }
          </p>

          <div>
            { sessionBio }
          </div>

        </div>

        <div className="user-recipes-heading-div">
          <h2 className="my-recipes-text">My Recipes</h2>
          {/* <h2 className="my-memories-text">My Memories</h2> */}
        </div>

        <div className="user-content-div">

          {/* <div className="user-recipes-div">
            { myRecipes }
          </div> */}

          <div className="user-recipes-div">
            { myRecipes?.map(recipe => (
              <div className="single-user-recipes-div" id={recipe?.id}>

                <div className="profile-food-img-div">
                  <a href={`/recipes/${recipe?.id}`}><img
                    onError={(event) => event.target.setAttribute("src", "https://live.staticflickr.com/65535/51418222296_9c3fcb2090_w.jpg")}
                    src={recipe.food_img} alt="food" className="profile-food-img" /></a>
                </div>

                <div className="profile-recipe-name-div">
                  {<a className="profile-recipe-name-link" href={`/recipes/${recipe?.id}`}>{recipe?.title}</a>}
                </div>

              </div>
            ))}
          </div>

          {/* <div className="user-memories-div">
            { myMemories?.map(memory => (
              <div className="user-memories-div" id={memory?.id}>
                {memory?.memory_text}
              </div>
            ))}
          </div> */}
        </div>

    </div>


  );
}
export default User;
