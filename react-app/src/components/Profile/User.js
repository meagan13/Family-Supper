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

    <div>
        <h3>
          Welcome, { user.username }!
        </h3>
        <p>
          <strong>Email:</strong> { user.email }
        </p>
        <p>
          <strong>About me:</strong> { user.bio }
        </p>

        <div className="user-recipes-heading-div">
          <h2 className="my-recipes-text">My Recipes</h2>
        </div>

        <div>
          ADD RECIPES HERE; BIO ISN'T WORKING
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
