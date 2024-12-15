import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { baseUrl } from '../config.js';
import { fetchAndCallback } from '../utils.js'
import ReactOnRails from 'react-on-rails';


const NewAlbum = () => {

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [files, setFiles] = useState('')

  const submitAlbum = () => {
    
    let createAlbumPath = baseUrl + '/albums/'

    let data = {
      "album": {
        "name": name,
        "description": description,
        "images": files
      }
    }

    fetchAndCallback(createAlbumPath, 'POST', JSON.stringify(data), (resp) => {
      if (resp.status === 200) {

        window.alert("Upload success!")

      } else {
        window.alert('Album create failed')
      }
    });
  }
  
  return (
    <div>
      <h2>New Album</h2>
      <br/>
      <form>
        <input type='text' value={name}
              placeholder="name"
              onChange={(e) => setName(e.target.value)} />

        <br/>
        <input type='text' value={description}
              name="description"
              placeholder="description"
              onChange={(e) => setDescription(e.target.value)} />

        <br/>
        <input type='file' name="images"
              onChange={(e) => setFiles(e.target.value)} />

        <br/>
        <input type="button" value={'Create Album'}
              onClick={submitAlbum}
              className={'input-button'} />
      </form>
    </div>
  );

};

export default NewAlbum;
