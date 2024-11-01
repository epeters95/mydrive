import PropTypes from 'prop-types';
import React from 'react';
import Photo from './Photo.jsx'
import * as style from './Album.module.css'
import ReactOnRails from 'react-on-rails';


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
    let header = {'Content-Type': 'application/json'};
    let csrfToken = ReactOnRails.authenticityToken();
    let dataStr = JSON.stringify(data);

    request.open('PATCH', fullPhotoPath, true);
    request.setRequestHeader("X-CSRF-Token", csrfToken);
    request.send(dataStr);
  }
  
  return (
    <div className={`d-flex p-2 flex-wrap ${style.album_container}`}>
      {photos.map((photo) => (

        <Photo name={photo.name}
               id={photo.id}
               key={photo.id}
               description={photo.description || ""}
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
