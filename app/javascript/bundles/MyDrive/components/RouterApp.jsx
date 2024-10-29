import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import RoutesComponent from '../routes/routes.jsx';

const RouterApp = (props) => {

  return (
    <BrowserRouter>
      <RoutesComponent/>
    </BrowserRouter>
  );
}

export default RouterApp;