import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LandingPage from '../components/LandingPage.jsx';
import Layout from '../components/Layout.jsx';
import Login from '../components/Login.jsx';
import Signup from '../components/Signup.jsx';
import Album from '../components/Album.jsx';
import AlbumsList from '../components/AlbumsList.jsx';
import EditAlbum from '../components/EditAlbum.jsx';
import { albumsLoader, editAlbumLoader, loadNavLinks } from '../loaders.jsx';

const RouterApp = (props) => {

  const router = createBrowserRouter([
    {
      element: <Layout />,
      loader: loadNavLinks,
      children: [
        {
          path: "/",
          element: <LandingPage/>
        },
        {
          path: "users/sign_in",
          element: <Login />
        },
        {
          path: "users/sign_up",
          element: <Signup />
        },
        {
          path: "albums",
          element: <AlbumsList />,
          loader: albumsLoader
        },
        {
          path: "albums/:albumId",
          element: <Album />
        },
        {
          path: "albums/:albumId/edit",
          element: <EditAlbum />,
          loader: editAlbumLoader,
        }
      ]
    }
  ]);

  return (
    <RouterProvider router={router} />
  );
}


export default RouterApp;