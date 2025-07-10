import ReactOnRails from 'react-on-rails';

import Album from '../bundles/MyDrive/components/album/Album';
import AlbumsList from '../bundles/MyDrive/components/album/AlbumsList';
import EditAlbum from '../bundles/MyDrive/components/album/EditAlbum';
import NewAlbum from '../bundles/MyDrive/components/album/NewAlbum';
import Photo from '../bundles/MyDrive/components/photo/Photo';
import Comment from '../bundles/MyDrive/components/photo/Comment';
import Login from '../bundles/MyDrive/components/user/Login';
import Signup from '../bundles/MyDrive/components/user/Signup';
import LandingPage from '../bundles/MyDrive/components/LandingPage';
import RouterApp from '../bundles/MyDrive/components/RouterApp';
import Layout from '../bundles/MyDrive/components/Layout';
import AllUsers from '../bundles/MyDrive/components/user/AllUsers';

import './bootstrap.bundle.min.js';
import './bootstrap.min.css';

ReactOnRails.register({
  Album,
  Photo,
  Comment,
  Login,
  Signup,
  LandingPage,
  RouterApp,
  Layout,
  AlbumsList,
  EditAlbum,
  NewAlbum,
  AllUsers
});
