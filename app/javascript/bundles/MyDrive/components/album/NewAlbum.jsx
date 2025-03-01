import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { baseUrl } from '../tools/config.js';
import { fetchAndCallback } from '../tools/utils.js'
import toast, { Toaster } from 'react-hot-toast';

const NewAlbum = () => {

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [files, setFiles] = useState('')

  const navigate = useNavigate()

  const submitAlbum = () => {
    
    let createAlbumPath = baseUrl + '/albums/'

    let data = {
      "album": {
        "name": name,
        "description": description,
        "images": files
      }
    }

    let success = false;

    fetchAndCallback(createAlbumPath, 'POST', JSON.stringify(data), (resp) => {
      if (resp.status === 200) {

        success = true;
        toast.success("Upload success!")

      } else {
        toast.error('Album create failed')
      }
    });

    setTimeout(() => {

      if (success) {
        navigate("/albums")
      }

    }, 2000);
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
        <input type='file' name="images" multiple="multiple"
              onChange={(e) => setFiles(e.target.files)} />

        <br/>
        <input type="button" value={'Create Album'}
              onClick={submitAlbum}
              className={'input-button'} />
      </form>
      <Toaster/>
    </div>
  );

};

export default NewAlbum;
