import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './User.css'

function User() {
  const [user, setUser] = useState({});
  const { userId }  = useParams();

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);

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
            ADD RECIPES HERE
          </div>

          <div className="user-memories-div">
            ADD MEMORIES HERE
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
