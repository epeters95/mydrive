import PropTypes from 'prop-types';
import React from 'react';
import { useLoaderData } from "react-router-dom";


const AlbumsList = () => {

  let { albums } = useLoaderData();
  
  return (
    <div>
      <h2>All Albums</h2>
      <ul>
      {albums.map((album) => (
        <li id={album.id}
            key={album.id}>
          <a href={album.path}>
            {album.name}
          </a>
        </li>
      ))}
      </ul>
    </div>
  );

};

export default AlbumsList;
