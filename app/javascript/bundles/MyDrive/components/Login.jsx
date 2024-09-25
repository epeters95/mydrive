import PropTypes from 'prop-types';
import React, { useState } from 'react';
import * as style from './Credentials.module.css'

const Login = (props) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  return (
    <div>
      <input type='text' value={email}
            placeholder="email address"
            onChange={(e) => setEmail(e.target.value)}
            className={'credential-field'} />

      <input type='password' value={password}
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            className={'credential-field'} />

      <input type="button" value={'Log In'}
            onClick={submitLogin}
            className={'input-button'} />

    </div>
  );

};

Login.propTypes = {
  email:         PropTypes.string.isRequired,
  password:      PropTypes.string.isRequired
};

const submitLogin = (email, password) => {
  fetch('http://localhost:3000/users/sign_in', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
     "email":    email,
     "password": password
    }),
  })
  .then((resp) => resp.json())
  .then((resp) => {

    if (resp.message === 'success') {
      props.setEmail(email)
      navigate('/')
    } else {
      window.alert('Invalid login information')
    }

  })
}

export default Album;
