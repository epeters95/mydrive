import PropTypes from 'prop-types';
import React from 'react';
import Photo from '../photo/Photo.jsx'
import * as style from '../styles/Album.module.css'
import { baseUrl } from '../tools/config.js';
import { useLoaderData, Link } from "react-router-dom";
import { fetchAndCallback } from '../tools/utils.js'


const Album = () => {

  const { album: { id, name, description, photos, show_path } } = useLoaderData();


  const editAlbumPath = baseUrl + '/albums/' + id + '/edit';

  const onDescChange = (newDesc, photoId=0) => {
    
    // rails route given does not include id, need PATCH to <photos_path>/:id
    let fullPhotoPath = show_path + '/photos/' + photoId;
    let data = {
      "photo": {
        "id": photoId,
        "description": newDesc
      }
    }

    // send PATCH
    fetchAndCallback(fullPhotoPath, 'PATCH', JSON.stringify(data));
  }
  
  return (
    <div>
      <span><Link to={editAlbumPath}>Edit</Link></span>
      <br/>
      <div className={`d-flex p-2 flex-wrap ${style.album_container}`}>
        {photos.map((photo) => (


          <Photo name={photo.name}
                 id={photo.id}
                 key={photo.id}
                 description={photo.description || ""}
                 image_url={photo.image_url}
                 handleDescChange={onDescChange} />
        ))}

      </div>
    </div>
  );

};

export default Album;
