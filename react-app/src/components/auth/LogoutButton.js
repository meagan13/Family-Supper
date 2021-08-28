import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logout } from '../../store/session';
import './LogoutButton.css'

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  return <NavLink to={'/'} onClick={onLogout} className="logout-text">Logout</NavLink>;
};

export default LogoutButton;
