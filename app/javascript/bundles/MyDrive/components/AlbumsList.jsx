import PropTypes from 'prop-types';
import React from 'react';


const AlbumsList = ({ albums }) => {
  
  return (
    <div>
      <ul>
      {albums.map((album) => (
        <li id={album.id}
            key={album.id}>
          <a href={album.path}>
            {album.title}
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
