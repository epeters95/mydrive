import PropTypes from 'prop-types';
import React, { useState } from 'react';
import * as style from './Credentials.module.css';
import ReactOnRails from 'react-on-rails';
import { useNavigate, useRevalidator } from 'react-router-dom';
import { baseUrl } from '../config.js';

const Login = (props) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  const revalidator = useRevalidator();

  const submitLogin = () => {
    let body = JSON.stringify({
      "user": {
        "email":    email,
        "password": password
      }
    });
    fetchAndCallback(baseUrl + '/users/sign_in', 'POST', body, (resp) => {
      if (resp.status === 200) {

        window.alert("Login success!")
        revalidator.revalidate();
        navigate("/albums");

      } else if (resp.status === 422) {
        window.alert('Unauthorized request')
      } else {
        window.alert('Invalid login information')
      }

    });
  }
  
  return (
    <div>
      <h2>Sign In</h2>
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
        <input type="button" value={'Log In'}
              onClick={submitLogin}
              className={'input-button'} />
      </form>
    </div>
  );

};

Login.propTypes = {
  email:         PropTypes.string,
  password:      PropTypes.string
};


export default Login;
