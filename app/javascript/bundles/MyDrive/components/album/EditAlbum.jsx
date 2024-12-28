import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useLoaderData, Link } from "react-router-dom";
import { fetchAndCallback } from '../tools/utils.js'


const EditAlbum = () => {

  const { album } = useLoaderData();

  const [albumName, setAlbumName] = useState(album.name)
  const [albumDesc, setAlbumDesc] = useState(album.description)
  const [files, setFiles] = useState('')

  const updateAlbum = () => {

    let data = {
      "album": {
        "name": albumName,
        "description": albumDesc,
        "images": files
      }
    }

    var formData = new FormData()

    for (let attr in data['album']) {
      formData.append(`album[${attr}]`, data['album'][attr]);
    }

    // send PATCH
    fetchAndCallback(album.path, 'PATCH', formData, null, false);
  }
  
  
  return (
    <div>
      <h2>Edit Album - {album.name}</h2>
      <br/>
      <span><Link to={album.path}>View</Link></span>

      <br/>
      <br/>
      <label id='album_name'>Name&nbsp;</label>
      <input type='text'
             id='album_name'
             name='album[name]'
             onChange={setAlbumName}
             value={albumName} />

      <br/>
      <label id='album_description'>Description</label>
      <textarea id='album_description'
                name='album[album_description]'
                onChange={setAlbumDesc}
                value={albumDesc}/>
      <br/>
      <p>Add a new image:</p>
      <input type='file' multiple="multiple" name="images"
              onChange={(e) => setFiles(e.target.files)} />

      <br/>
      <input type="submit"
             name="commit"
             value="Update"
             data-disable-with="Update"
             onClick={updateAlbum}
             />
    </div>
  );

};

export default EditAlbum;
