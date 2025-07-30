import PropTypes from 'prop-types';
import React from 'react';
import { useLoaderData } from "react-router-dom";
import Album from '../album/Album.jsx'

const PhotosList = () => {

  let { albums } = useLoaderData();
  
  return (
    <div>
      <h2>All Album Photos</h2>
      <ul>
      {albums.map((album) => (
        <Album id={album.id}
               path={album.path}
               name={album.name}
               user_id={album.user_id},
               description={album.description},
               photos={album.photos},
               show_path={album.show_path}>

        </Album>
      ))}
      </ul>
    </div>
  );

};

export default PhotosList;
