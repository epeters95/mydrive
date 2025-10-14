import ReactOnRails from 'react-on-rails';

import Album from '../bundles/MyDrive/components/album/Album';
import AlbumsList from '../bundles/MyDrive/components/album/AlbumsList';
import EditAlbum from '../bundles/MyDrive/components/album/EditAlbum';
import NewAlbum from '../bundles/MyDrive/components/album/NewAlbum';

import Photo from '../bundles/MyDrive/components/photo/Photo';
import PhotosList from '../bundles/MyDrive/components/photo/PhotosList';
import NewShare from '../bundles/MyDrive/components/photo/NewShare';
import Comment from '../bundles/MyDrive/components/photo/Comment';
import CommentsList from '../bundles/MyDrive/components/photo/CommentsList';

import Login from '../bundles/MyDrive/components/auth/Login';
import Signup from '../bundles/MyDrive/components/auth/Signup';
import AllUsers from '../bundles/MyDrive/components/auth/AllUsers';

import LandingPage from '../bundles/MyDrive/components/LandingPage';
import RouterApp from '../bundles/MyDrive/components/RouterApp';
import Layout from '../bundles/MyDrive/components/Layout';

import './bootstrap.bundle.min.js';
import './bootstrap.min.css';

ReactOnRails.register({
  Album,
  AlbumsList,
  EditAlbum,
  NewAlbum,
  Photo,
  PhotosList,
  NewShare,
  Comment,
  CommentsList,
  Login,
  Signup,
  AllUsers,
  LandingPage,
  RouterApp,
  Layout
});
