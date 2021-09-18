import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

function UsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/users/');
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, []);

  const userComponents = users.map((user) => {
    return (
      <div className="users-list-div">
        <ul className="no-bullets">
          <li key={user.id}>
            <NavLink to={`/users/${user.id}`} className="user-link-div">
              <img className="profile-img"
                onError={(event) => event.target.setAttribute("src", "https://image.pngaaa.com/189/734189-middle.png")}
                src={user.imgUrl} alt="user profile" />{user.username}
            </NavLink>
          </li>
        </ul>
      </div>
    );
  });

  return (
    <>
      <h1>Family Members: </h1>
      <ul>{userComponents}</ul>
    </>
  );
}

export default UsersList;
