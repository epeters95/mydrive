import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LandingPage from '../components/LandingPage.jsx';
import ReactOnRails from 'react-on-rails';
import * as style from './Credentials.module.css';
import Login from '../components/Login.jsx';
import AlbumsList from '../components/AlbumsList.jsx';
import EditAlbum from '../components/EditAlbum.jsx';

const RouterApp = (props) => {

  const albumsLoader = () => {
    return fetch('http://localhost:3000/albums', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': ReactOnRails.authenticityToken()
      }
    });
  }

  const editAlbumLoader = ({ params }) => {
    return fetch('http://localhost:3000/albums/' + params.albumId + '/edit', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': ReactOnRails.authenticityToken()
      }
    });
  }

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
    <RouterProvider router={router} />
  );
}


export default RouterApp;