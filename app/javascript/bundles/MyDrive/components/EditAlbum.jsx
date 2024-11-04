import PropTypes from 'prop-types';
import React, { useState } from 'react';
import ReactOnRails from 'react-on-rails';


const EditAlbum = ({ album }) => {

  const [albumName, setAlbumName] = useState('')
  const [albumDesc, setAlbumDesc] = useState('')

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

    request.open('PATCH', album.edit_path, true);
    request.setRequestHeader("X-CSRF-Token", csrfToken);
    request.send(dataStr);
  }
  
  
  return (
    <div>
      <h2>Edit Album - {album.name}</h2>
      <br>
      <span><a href={album.path}>View</a></span>

      <br>
      <br>
      <label for='album_name'>Name</label>
      <input type='text'
             id='album_name'
             name='album[name]'
             value={albumName} />

      <label for='album_description'>Description</label>
      <textarea id='album_description'
                name='album[album_description]'>
                {albumDesc}
      </textarea>
      <br>
      <p>Add a new image:</p>
      <input multiple="multiple" type="file" name="album[images][]" id="album_images">
      <input type="submit"
             name="commit"
             value="Update"
             data-disable-with="Update"
             onClick={updateAlbum}
             />
    </div>
  );

};

EditAlbum.propTypes = {
  album:       PropTypes.object
};

export default EditAlbum;
