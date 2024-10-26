import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LandingPage from '../components/LandingPage.jsx';
import Login from '../components/Login.jsx';

export default (
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/users/sign_in" element={<Login />} />
  </Routes>
);