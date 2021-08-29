import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom';
import { signUp } from '../../store/session';
import './SignUpForm.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [bio, setBio] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePhoto = (e) => {
    setImgUrl(e.target.value);
  };

  const updateBio = (e) => {
    setBio(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className="signup-form-div">
      <div id="signup-form" className="form-container">
        <form className="signup-form" onSubmit={onSignUp}>
          <div className="sign-form-title">
            <h2 className="signup-form-title-text">Join the Family</h2>
          </div>

          <div>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>

          <div className="signup-input-div">
            <label className="signup-text">User Name</label>
            <input
              className="signup-input"
              type='text'
              name='username'
              onChange={updateUsername}
              value={username}
            ></input>
          </div>

          <div className="signup-input-div">
            <label className="signup-text">Email</label>
            <input
              className="signup-input"
              type='text'
              name='email'
              onChange={updateEmail}
              value={email}
            ></input>
          </div>

          <div className="signup-input-div">
            <label className="signup-text">Photo</label>
            <input
              className="signup-input"
              type="text"
              name="imgUrl"
              onChange={updatePhoto}
              value={imgUrl}
            ></input>
          </div>

          <div className="signup-input-div">
            <label className="signup-text">About Me</label>
            <input
              className="signup-input"
              type="text"
              name="bio"
              onChange={updateBio}
              value={bio}
            ></input>
          </div>

          <div className="signup-input-div">
            <label className="signup-text">Password</label>
            <input
              className="signup-input"
              type='password'
              name='password'
              onChange={updatePassword}
              value={password}
            ></input>
          </div>

          <div className="signup-input-div">
            <label className="signup-text">Confirm Password</label>
            <input
              className="signup-input"
              type='password'
              name='repeat_password'
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
            ></input>
          </div>

          <button className="signup-text signup-button" type='submit'>Sign Up</button>

        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
