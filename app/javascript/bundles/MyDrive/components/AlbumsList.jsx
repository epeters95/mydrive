import PropTypes from 'prop-types';
import React from 'react';


const AlbumsList = (props) => {

  let albums = props.albums;
  
  return (
    <div>
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
