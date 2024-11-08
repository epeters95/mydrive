import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LandingPage from '../components/LandingPage.jsx';

const RouterApp = (props) => {

  const albumsLoader = () => {
    return fetch('http://localhost:3000/albums', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  const editAlbumLoader = ({ params }) => {
    return fetch('http://localhost:3000/albums/' + params.albumId + '/edit', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
      children: [
        {
          path: "team",
          element: <Team />,
          loader: teamLoader,
        },
      ],
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
          path: "/:albumId/edit",
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