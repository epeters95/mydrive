import React, { useState } from 'react';
import * as style from '../styles/Credentials.module.css';
import { useNavigate, useRevalidator } from 'react-router-dom';
import { baseUrl } from '../tools/config.js';
import { fetchAndCallback } from '../tools/utils.js'
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {

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

    let success = false;
    fetchAndCallback(baseUrl + "/users/sign_in", "POST", body, (resp) => {

      if (resp.status === 200) {

        toast.success('Login success')
        revalidator.revalidate();
        success = true;

      } else if (resp.status === 422) {
        toast.error('Unauthorized request')
      } else {
        toast.error('Invalid login information')
      }
    });

    setTimeout(() => {

      if (success) {
        navigate("/albums")
      }

    }, 2000);
  }

  const formKeyPress = (e) => {
    if(e && (e.key == "Enter" || e.keyCode == 13)) {
      submitLogin()
    }
  }

  return (
    <div>
      <h2>Sign In</h2>
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
          <input type="button" value={'Log In'}
                onClick={submitLogin}
                className={'credential-submit'} />
        </form>
      </div>
      <Toaster/>
    </div>
  );

};


export default Login;
