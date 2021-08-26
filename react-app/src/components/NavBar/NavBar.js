
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/session';
import LogoutButton from '../auth/LogoutButton';
import './NavBar.css'

const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const demoUserLogin = async(e) => {
    e.preventDefault();
    await dispatch(login('demo@aa.io', 'password'));

  }

  let sessionLinks;

  if (sessionUser) {
    sessionLinks = (
      <>
        <div className="home-link-div">
          <NavLink to='/' exact={true} activeClassName='active' className="navbar-text">
              Home
          </NavLink>
        </div>

        <div className="profile-link-div">
          <NavLink to={`/users/${sessionUser.id}`} exact={true} activeClassName='active' className='user-profile-link navbar-text'>
            Profile
          </NavLink>
        </div>

        <div className="share-recipe-link-div">
          <NavLink to={`/share-recipe`} exact={true} activeClassName='active' className='create-recipe-link navbar-text'>
            Share a Recipe
          </NavLink>
        </div>

        <div className="logout-button-div">
          <LogoutButton user={sessionUser} className='logout-button' />
        </div>
      </>
    )
  } else {
    sessionLinks = (
      <>
        <div className="home-link-div">
          <NavLink to='/' exact={true} activeClassName='active' className="navbar-text">
            Home
          </NavLink>
        </div>

        <div className="signup-link-div">
          <NavLink to='/sign-up' exact={true} activeClassName='active' className='sign-up-link navbar-text'>
            Sign Up
          </NavLink>
        </div>

        <div className="login-link-div">
          <NavLink to='/login' exact={true} activeClassName='active' className="login-link navbar-text">
            Login
          </NavLink>
        </div>

        <div className="demo-button-div">
          <button className="demo-button" onClick={demoUserLogin}>Demo</button>
        </div>
      </>
    )
  }

  return (
    <div className="nav-bar-div">
      <div className="app-title-div">
        <a href="/"><h1 className="title-text">Family Supper</h1></a>
      </div>

      <div className="right-nav">
        {sessionLinks}
      </div>
    </div>

  );
}

export default NavBar;
