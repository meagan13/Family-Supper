
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../src/store/session';
import LogoutButton from './auth/LogoutButton';

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
        <NavLink to='/' exact={true} activeClassName='active'>
            Home
        </NavLink>

        <NavLink to={`/users/${sessionUser.id}`} exact={true} activeClassName='active' className='user-profile-link'>
          Profile
        </NavLink>

        <LogoutButton user={sessionUser} className='logout-button' />
      </>
    )
  } else {
    sessionLinks = (
      <>
        <NavLink to='/' exact={true} activeClassName='active'>
          Home
        </NavLink>

        <NavLink to='/sign-up' exact={true} activeClassName='active' className='sign-up-link'>
          Sign Up
        </NavLink>

        <NavLink to='/login' exact={true} activeClassName='active' className="login-link">
          Login
        </NavLink>

        <button className="demo-button" onClick={demoUserLogin}>Demo</button>
      </>
    )
  }

  return (
    <div>
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
