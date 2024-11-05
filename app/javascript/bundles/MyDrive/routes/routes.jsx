import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import LandingPage from '../components/LandingPage.jsx';
import Login from '../components/Login.jsx';
import Layout from '../components/Layout.jsx';
import AlbumsList from '../components/AlbumsList.jsx';
import EditAlbum from '../components/EditAlbum.jsx';

export default (
  <Layout>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/users/sign_in" element={<Login />} />
      <Route path="/albums" element={<AlbumsList />} />
      <Route path="/albums/:id/edit" element={<EditAlbum />} />
    </Routes>
  </Layout>
);