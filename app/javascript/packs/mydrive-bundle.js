import ReactOnRails from 'react-on-rails';

import Album from '../bundles/MyDrive/components/Album';
import Photo from '../bundles/MyDrive/components/Photo';
import Login from '../bundles/MyDrive/components/Login';
import Signup from '../bundles/MyDrive/components/Signup';
import LandingPage from '../bundles/MyDrive/components/LandingPage';
import RouterApp from '../bundles/MyDrive/components/RouterApp';
import Layout from '../bundles/MyDrive/components/Layout';
import AlbumsList from '../bundles/MyDrive/components/AlbumsList';
import EditAlbum from '../bundles/MyDrive/components/EditAlbum';
import NewAlbum from '../bundles/MyDrive/components/NewAlbum';

import './bootstrap.bundle.min.js';
import './bootstrap.min.css';

ReactOnRails.register({
  Album,
  Photo,
  Login,
  Signup,
  LandingPage,
  RouterApp,
  Layout,
  AlbumsList,
  EditAlbum,
  NewAlbum
});
