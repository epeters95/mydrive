import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LandingPage from '../components/LandingPage.jsx';

export default (
  <div>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="sign_in" element={<Login />} />
    </Routes>
  </div>
);