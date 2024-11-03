import ReactOnRails from 'react-on-rails';

import Album from '../bundles/MyDrive/components/Album';
import Photo from '../bundles/MyDrive/components/Photo';
import Login from '../bundles/MyDrive/components/Login';
import LandingPage from '../bundles/MyDrive/components/LandingPage';
import RouterApp from '../bundles/MyDrive/components/RouterApp';
import Layout from '../bundles/MyDrive/components/Layout';
import AlbumsList from '../bundles/MyDrive/components/AlbumsList';
import EditAlbum from '../bundles/MyDrive/components/EditAlbum';

ReactOnRails.register({
  Album,
  Photo,
  Login,
  LandingPage,
  RouterApp,
  Layout,
  AlbumsList,
  EditAlbum
});
