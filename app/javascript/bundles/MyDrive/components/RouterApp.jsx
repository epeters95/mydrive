import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LandingPage from './LandingPage.jsx';
import Layout from './Layout.jsx';
import Login from './auth/Login.jsx';
import Signup from './auth/Signup.jsx';
import Album from './album/Album.jsx';
import AlbumsList from './album/AlbumsList.jsx';
import EditAlbum from './album/EditAlbum.jsx';
import NewAlbum from './album/NewAlbum.jsx';
import AllUsers from './auth/AllUsers.jsx';
import CommentsList from './photo/CommentsList.jsx';
import { albumsLoader,
         editAlbumLoader,
         allUsersLoader,
         loadNavLinks,
         allCommentsLoader } from './tools/loaders.jsx';

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
          element: <Album />,
          loader: editAlbumLoader
        },
        {
          path: "albums/:albumId/edit",
          element: <EditAlbum />,
          loader: editAlbumLoader,
        },
        {
          path: "albums/new",
          element: <NewAlbum />
        },
        // {
        //   path: "users",
        //   element: <AllUsers />,
        //   loader: allUsersLoader
        // },
        // {
        //   path: "comments",
        //   element: <CommentsList />,
        //   loader: allCommentsLoader
        // }
      ]
    }
  ]);

  return (
    <RouterProvider router={router} />
  );
}


export default RouterApp;