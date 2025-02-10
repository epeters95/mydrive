import PropTypes from 'prop-types';
import React, { useState } from 'react';
import * as style from '../styles/Credentials.module.css';
import { useNavigate, useRevalidator } from 'react-router-dom';
import { baseUrl } from '../tools/config.js';
import { fetchAndCallback } from '../tools/utils.js'
import toast, { Toaster } from 'react-hot-toast';

const Signup = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConf, setPasswordConf] = useState('')

  const navigate = useNavigate()
  const revalidator = useRevalidator();

  const emailRegx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

  let success = false;

  const submitLogin = () => {
    if (password != passwordConf) {
      toast('Passwords do not match');

    } else if (!email.match(emailRegx)) {
      toast('Please enter a valid email');
      
    } else {
      let body = JSON.stringify({
        "user": {
          "email":    email,
          "password": password
        }
      })
      fetchAndCallback(baseUrl + '/users', 'POST', body, (resp) => {
        if (resp.status === 200) {

          toast.success('User account created')
          revalidator.revalidate();
          success = true;

        } else if (resp.status === 422) {
          toast.error('Unauthorized request')
        } else {
          toast.error('Failed to create user')
        }
      });

      setTimeout(() => {

        if (success) {
          navigate("/albums")
        }

      }, 2000);

    }
  }

  const formKeyPress = (e) => {
    if(e && (e.key == "Enter" || e.keyCode == 13)) {
      submitLogin()
    }
  }
  
  return (
    <div>
      <h2>Sign Up</h2>
      <br/>
      <div onKeyPress={(e) => formKeyPress(e)}>
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
          <input type="button" value={'Sign Up'}
                onClick={submitLogin}
                className={'input-button'} />
        </form>
      </div>
      <Toaster/>
    </div>
  );

};


export default Signup;
