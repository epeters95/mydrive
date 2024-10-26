import PropTypes from 'prop-types';
import React, { useState } from 'react';
import * as style from './Credentials.module.css';
import ReactOnRails from 'react-on-rails';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  let navigate = useNavigate();

  const submitLogin = () => {
    fetch('http://localhost:3000/users/sign_in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': ReactOnRails.authenticityToken()
      },
      body: JSON.stringify({
       "email":    email,
       "password": password
      }),
    })
    .then((resp) => {

      if (resp.status === 200) {
        // props.setEmail(email)
        // navigate('/') 
        console.log(resp)
        window.alert("Login success!")
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
