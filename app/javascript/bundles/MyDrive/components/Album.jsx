import PropTypes from 'prop-types';
import React from 'react';
import Photo from './Photo.jsx'
import * as style from './Album.module.css'
import ReactOnRails from 'react-on-rails';
import { baseUrl } from '../config.js';
import { useLoaderData } from "react-router-dom";


const Album = () => {

  const { id, name, description, photos, photosPath } = useLoaderData();


  const editAlbumPath = baseUrl + '/albums/' + id + '/edit';

  const onDescChange = (newDesc, photoId=0) => {
    console.log('Description for photo ' + photoId + ' changed to ' + newDesc);
    
    // rails route given does not include id, need PATCH to <photos_path>/:id
    let fullPhotoPath = photosPath + '/' + photoId;
    let data = {
      "photo": {
        "id": photoId,
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
    <div>
      <span><a href={editAlbumPath}>Edit</a></span>
      <br/>
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
    </div>
  );

};

Album.propTypes = {
  albumId:           PropTypes.number
};

export default Album;
