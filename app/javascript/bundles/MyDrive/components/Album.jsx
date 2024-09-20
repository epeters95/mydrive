import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Photo from './Photo.jsx'
import * as style from './Album.module.css'


const Album = (props) => {

  const { name, description, photos } = props
  
  return (
    <div className={`d-flex p-2 flex-wrap ${style.album_container}`}>
      {photos.map((photo) => (

        <Photo name={photo.name} description={photo.description} image_url={photo.image.url} />
      ))}

    </div>
  );

};

Album.propTypes = {
  name:         PropTypes.string.isRequired,
  description:  PropTypes.string,
  photos:       PropTypes.array
};

export default Album;
