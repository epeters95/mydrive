import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import routes from '../routes/routes.jsx';
import LandingPage from '../components/LandingPage.jsx';

const RouterApp = (props) => {

  return (
    <BrowserRouter>
      {routes}
    </BrowserRouter>
  );
}

export default RouterApp;