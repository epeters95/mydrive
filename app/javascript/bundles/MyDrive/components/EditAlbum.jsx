import PropTypes from 'prop-types';
import React, { useState } from 'react';
import ReactOnRails from 'react-on-rails';
import { useLoaderData, Link } from "react-router-dom";


const EditAlbum = () => {

  const { album } = useLoaderData();

  const [albumName, setAlbumName] = useState(album.name)
  const [albumDesc, setAlbumDesc] = useState(album.description)

  const updateAlbum = () => {
    let data = {
      "album": {
        "id": album.id,
        "name": albumName,
        "description": albumDesc,
      }
    }

    // send PATCH
    let request = new XMLHttpRequest();
    let header = {'Content-Type': 'application/json'};
    let csrfToken = ReactOnRails.authenticityToken();
    let dataStr = JSON.stringify(data);

    request.open('PATCH', album.path, true);
    request.setRequestHeader("X-CSRF-Token", csrfToken);
    request.send(dataStr);
  }
  
  
  return (
    <div>
      <h2>Edit Album - {album.name}</h2>
      <br/>
      <span><Link to={album.path}>View</Link></span>

      <br/>
      <br/>
      <label id='album_name'>Name</label>
      <input type='text'
             id='album_name'
             name='album[name]'
             onChange={setAlbumName}
             value={albumName} />

      <label id='album_description'>Description</label>
      <textarea id='album_description'
                name='album[album_description]'
                onChange={setAlbumDesc}>
                {albumDesc}
      </textarea>
      <br/>
      <p>Add a new image:</p>
      <input multiple="multiple" type="file" name="album[images][]" id="album_images" />
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
