import PropTypes from 'prop-types';
import React from 'react';
import { useLoaderData } from "react-router-dom";


const AlbumsList = (props) => {

  // let albums = props.albums;
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

AlbumsList.propTypes = {
  albums:       PropTypes.array
};

export default AlbumsList;
