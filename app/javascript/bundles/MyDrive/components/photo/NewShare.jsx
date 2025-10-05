import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { baseUrl } from '../tools/config.js';
import { fetchAndCallback } from '../tools/utils.js'
import toast, { Toaster } from 'react-hot-toast';

const NewShare = () => {

  const [users, setUsers] = useState([])
  const [photoId, setPhotoId] = useState('')

  const navigate = useNavigate()

  const submitSharePhoto = () => {

    let createSharePath = baseUrl + '/shares/'

    let data = {
      "share": {
        "photoId": photoId,
        "users": users
      }
    }

    let success = false;

    fetchAndCallback(createSharePath, 'POST', JSON.stringify(data), (resp) => {
      if (resp.status === 200) {

        success = true;
        toast.success("Share success!")

      } else {
        toast.error('Share photo failed')
      }
    });

    setTimeout(() => {

      if (success) {
        // Todo: change to recent photo id url
        navigate("/shares")
      }

    }, 2000);
  }

  return (
    <div>
      <h2>Share Photo</h2>
      <br/>
      <p>test</p>
      <Toaster/>
    </div>
  );

};

export default NewShare;
