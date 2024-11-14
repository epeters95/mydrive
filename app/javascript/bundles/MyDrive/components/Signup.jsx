import PropTypes from 'prop-types';
import React, { useState } from 'react';
import * as style from './Credentials.module.css';
import ReactOnRails from 'react-on-rails';
import { useNavigate, useRevalidator } from 'react-router-dom';

const Signup = (props) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConf, setPasswordConf] = useState('')

  const navigate = useNavigate()
  const revalidator = useRevalidator();

  const submitLogin = () => {
    if (password != passwordConf) {
      window.alert('Passwords do not match')
    } else {
      fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': ReactOnRails.authenticityToken()
        },
        body: JSON.stringify({
          "user": {
            "email":    email,
            "password": password
          }
        }),
      })
      .then((resp) => {

        if (resp.status === 200) {

          window.alert("Sign up success!")
          revalidator.revalidate();
          navigate("/albums");

        } else if (resp.status === 422) {
          window.alert('Unauthorized request')
        } else {
          window.alert('Failed to create user')
        }

      })
    }
  }
  
  return (
    <div>
      <h2>Sign Up</h2>
      <br/>
      <form>
        <input type='text' value={email}
              placeholder="email address"
              onChange={(e) => setEmail(e.target.value)}
              className={'credential-field'} />

        <br/>
        <input type='password' value={password}
              name="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
              className={'credential-field'} />

        <br/>
        <input type='password' value={passwordConf}
              name="password_confirmation"
              placeholder="password confirmation"
              onChange={(e) => setPasswordConf(e.target.value)}
              className={'credential-field'} />

        <br/>
        <input type="button" value={'Log In'}
              onClick={submitLogin}
              className={'input-button'} />
      </form>
    </div>
  );

};

Signup.propTypes = {
  email:                  PropTypes.string,
  password:               PropTypes.string,
  password_confirmation:  PropTypes.string
};


export default Signup;
