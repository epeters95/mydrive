import PropTypes from 'prop-types';
import React, { useState } from 'react';
import * as style from './Credentials.module.css';
import ReactOnRails from 'react-on-rails';
import { redirect } from 'react-router-dom';

const Login = (props) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const submitLogin = () => {
    fetch('http://localhost:3000/users/sign_in', {
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

        window.alert("Login success!")
        redirect("/albums");

      } else if (resp.status === 422) {
        window.alert('Unauthorized request')
      } else {
        window.alert('Invalid login information')
      }

    })
  }
  
  return (
    <div>
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

    </div>
  );

};

Login.propTypes = {
  email:         PropTypes.string,
  password:      PropTypes.string
};


export default Login;
