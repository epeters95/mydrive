import PropTypes from 'prop-types';
import React from 'react';
import Album from './Album.jsx'
import ReactOnRails from 'react-on-rails';
import { baseUrl } from '../config.js';
import { fetchAndCallback } from '../utils.js'


const NewAlbum = () => {

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const submitAlbum = (newDesc, photoId=0) => {
    
    let createAlbumPath = baseUrl + '/albums/'

    let data = {
      "photos": {
        "id": photoId,
        "description": newDesc
      }
    }

    // send PATCH
    fetchAndCallback(createAlbumPath, 'POST', JSON.stringify(data));
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
        <input type="button" value={'Create Album'}
              onClick={submitAlbum}
              className={'input-button'} />
      </form>
    </div>
  );

};

export default NewAlbum;
