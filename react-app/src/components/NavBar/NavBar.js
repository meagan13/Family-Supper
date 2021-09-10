import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/session';
import LogoutButton from '../auth/LogoutButton';
import SearchPage from '../SearchPage/SearchPage';
import './NavBar.css'

const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  // let sessionRecipe;

  const demoUserLogin = async(e) => {
    e.preventDefault();
    await dispatch(login('demo@aa.io', 'password'));

  }

  // if(sessionUser) {
  //     sessionRecipe = (
  //         <>
  //             <h3 className="welcome-text">Welcome, { sessionUser?.username}! </h3>
  //         </>
  //     )
  // }

  let sessionLinks;

  if (sessionUser) {
    sessionLinks = (
      <>
        <div className="dropdown-div">
          <button className="dropdown-button">Menu</button>
          <div className="dropdown-content">
            <div className="home-link-div">
              <NavLink to='/' exact={true} activeClassName='active' className="navbar-text">
                  Home
              </NavLink>
            </div>

            <div className="profile-link-div">
              <NavLink to={`/users/${sessionUser.id}`} exact={true} activeClassName='active' className='user-profile-link navbar-text'>
                My Profile
              </NavLink>
            </div>

            <div className="share-recipe-link-div">
              <NavLink to={`/share-recipe`} exact={true} activeClassName='active' className='create-recipe-link navbar-text'>
                Share a Recipe
              </NavLink>
            </div>

            <div className="logout-link-div">
              <LogoutButton user={sessionUser} className='logout-link' />
            </div>
          </div>
        </div>
      </>
    )
  } else {
    sessionLinks = (
      <>
        <div className="dropdown-div">
          <button className="dropdown-button">Menu</button>
          <div className="dropdown-content">
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
              {/* <button className="demo-button" onClick={demoUserLogin}>Demo</button> */}
              <NavLink to={'/'} className="demo-link" onClick={demoUserLogin}>Demo</NavLink>
            </div>

          </div>
        </div>
      </>
    )
  }

  return (
    <div className="nav-bar-div">
      <div className="app-title-div">
        <a href="/"><h1 className="title-text">Family Supper</h1></a>
      </div>

    <div className="search-page-div">
      <SearchPage />
    </div>

    <div className="right-nav">
        {sessionLinks}
      </div>
    </div>

  );
}

export default NavBar;
