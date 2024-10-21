import PropTypes from 'prop-types';
import React from 'react';
import Photo from './Photo.jsx'
import * as style from './Album.module.css'


const Album = ({ name, description, photos, photosPath }) => {

  const onDescChange = (newDesc, id=0) => {
    console.log('Description for photo ' + id + ' changed to ' + newDesc);
    
    // rails route given does not include id, need PATCH to <photos_path>/:id
    let fullPhotoPath = photosPath + '/' + id;
    let data = {
      "photo": {
        "id": id,
        "description": newDesc
      }
    }

    // send PATCH
    let request = new XMLHttpRequest();
    request.open('PATCH', fullPhotoPath, true);
    request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    request.send(data);
  }
  
  return (
    <div className={`d-flex p-2 flex-wrap ${style.album_container}`}>
      {photos.map((photo) => (

        <Photo name={photo.name}
               key={photo.id}
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
  photos:       PropTypes.array,
  photosPath:   PropTypes.string
};

export default Album;
