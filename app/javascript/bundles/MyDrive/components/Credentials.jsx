import PropTypes from 'prop-types';
import React from 'react';
import * as style from './Credentials.module.css'
import { useNavigate } from 'react-router-dom';


const Credentials = () => {

  const navigate = useNavigate();
  return (
    <div>
      <Routes>
        <Route exact path="/users/sign_in" element={<Login />} />
        {/*<Route exact path="/home" element={<Home />} />*/}
        {/*<Route exact path="/users/sign_up" element={<Signup />} />*/}
      </Routes>
    </div>
  );
}

export default Credentials;
