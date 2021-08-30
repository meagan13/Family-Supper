import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getMemories } from '../../store/memory';
import { getRecipes } from '../../store/recipe';
import './User.css'

function User() {
  const dispatch = useDispatch();
  const { userId }  = useParams();

  const recipes = useSelector(state => state?.recipes)
  const recipesArr = Object.values(recipes)

  const memories = useSelector(state => state?.memories)
  const memoriesArr = Object.values(memories)

  const [user, setUser] = useState({});

  const myRecipes = recipesArr.filter(recipe => recipe && recipe?.user_id === userId)

  console.log("memories state:", memories)
  console.log("memories array:", memoriesArr)
  console.log("user id from useParams:", userId)
  console.log("My recipes:", myRecipes)
  console.log("recipes in profile:", recipes)
  console.log("recipes array:", recipesArr)

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

  return (

    <div className="profile-div">
        <div className="profile-pic-name-div">
          {/* <img className="profile-img" src={ user.imgUrl } alt="user profile image" /> */}
          <img className="profile-img" src="https://live.staticflickr.com/65535/50951145667_870fc85517_z.jpg" alt="placeholder" />

          <h3 className="username-text">
            { user.username }
          </h3>
        </div>


        <div className="user-info-div">
          <p className="email-text">
            <strong>Email:</strong> { user.email }
          </p>

          <p className="bio-text">
            <strong>About me:</strong> { user.bio }
          </p>
        </div>

        <div className="user-recipes-heading-div">
          <h2 className="my-recipes-text">My Recipes</h2>
          <h2 className="my-memories-text">My Memories</h2>
        </div>

        <div className="user-content-div">
          <div className="user-recipes-div">
            { recipesArr?.map(recipe => (
              <div className="user-recipes-div" id={recipe?.id}>
                {recipe?.user_id} { userId } {recipe?.title}
              </div>
            ))}
          </div>

          <div className="user-memories-div">
            { recipesArr?.map(recipe => (
              <div className="user-recipes-div" id={recipe?.id}>
                {recipe?.id?.memories} { userId }
              </div>
            ))}
          </div>
        </div>
        {/* <div className="user-recipes-content">
          {user.comment && user.comment.map(comment => (
            <div className="comment">
              <a href={`/course/${comment?.course_id}`} >
                {comment?.content}
              </a>
            </div>
          ))}
        </div> */}

    </div>


  );
}
export default User;
