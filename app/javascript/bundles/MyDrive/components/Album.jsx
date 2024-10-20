import PropTypes from 'prop-types';
import React from 'react';
import Photo from './Photo.jsx'
import * as style from './Album.module.css'


const Album = ({ name, description, photos }) => {

  const onDescChange = (newDesc) => {
    console.log('Description changed to ' + newDesc);
    // TODO: send as PATCH to server somehow
  }
  
  return (
    <div className={`d-flex p-2 flex-wrap ${style.album_container}`}>
      {photos.map((photo) => (

        <Photo name={photo.name}
               description={photo.description}
               image_url={photo.image.url}
               handleDescChange={onDescChange} />
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
