import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LandingPage from '../components/LandingPage.jsx';
import Layout from '../components/Layout.jsx';
import Login from '../components/Login.jsx';
import AlbumsList from '../components/AlbumsList.jsx';
import EditAlbum from '../components/EditAlbum.jsx';
import { albumsLoader, editAlbumLoader } from '../loaders.js';

const RouterApp = (props) => {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "/users/sign_in",
      element: <Login />
    },
    {
      path: "/albums",
      element: <AlbumsList />,
      loader: albumsLoader,
      children: [
        {
          path: ":albumId/edit",
          element: <EditAlbum />,
          loader: editAlbumLoader,
        },
      ],
    }
  ]);

  return (
    <Layout>
      <RouterProvider router={router} />
    </Layout>
  );
}


export default RouterApp;