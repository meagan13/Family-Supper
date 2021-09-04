import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import './LoginForm.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();

    // const errorData = [];

    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }

    // if(email.length > 50) {
    //   errorData.push("Email address must be no longer than 50 chracters.")
    // }

    // if(email.length < 4) {
    //   errorData.push("Email must be at least three characters long.")
    // }

    // if(email === "") {
    //   errorData.push("Please enter an email.")
    // }

    // if(!email.includes("@")) {
    //   errorData.push("Please enter a valid email.")
    // }

    // if(!password === user.password) {
    //   errorData.push("Password is incorrect.")
    // }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className="login-form-div">
      <div id="login-form" className="form-container">
        <form className="login-form" onSubmit={onLogin}>

          <div className="login-errors-div">
            {errors.map((error, i) => (
              <div key={i}>{error}</div>
            ))}
          </div>

          <div className="login-form-title">
            <h2 className="login-form-title-text">Welcome home!</h2>
          </div>

          <div className="login-input-div">
            <label className="login-text" htmlFor='email'>Email</label>
            <input
              className="login-input"
              name='email'
              type='text'
              // placeholder='Email'
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div>
            <label className="login-text" htmlFor='password'>Password</label>
            <input
              className="login-input"
              name='password'
              type='password'
              // placeholder='Password'
              value={password}
              onChange={updatePassword}
            />
            <button className="login-text login-button" type='submit'>Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
