import PropTypes from 'prop-types';
import React from 'react';
import Photo from '../photo/Photo.jsx'
import * as style from '../styles/Album.module.css'
import { baseUrl } from '../tools/config.js';
import { useLoaderData, useRevalidator, Link } from "react-router-dom";
import { fetchAndCallback } from '../tools/utils.js'
import toast, { Toaster } from 'react-hot-toast';
import { getCurrentUserId } from '../auth/links.jsx';

const Album = (id, user_id, name, description, photos) => {

  // if no passed in arguments (show page)

  if ([id, user_id, name, description, photos, show_path].filter((el) => el === undefined).length > 0) {
    
    // Album show page doesn't have data passed in
    const album = useLoaderData();
    id = album.id
    user_id = album.user_id
    name = album.name
    description = album.description
    photos = album.photos
    show_path = album.show_path
  }

  const revalidator = useRevalidator();

  let editAlbumLink = <></>;

  let onDescSubmit = () => {};

  let onCommentSubmit = () => {};

  let onCommentDelete = () => {};

  const editAlbumPath = baseUrl + '/albums/' + id + '/edit';

  if (getCurrentUserId() === user_id) {
    editAlbumLink = <Link to={editAlbumPath}>Edit</Link>;

    onDescSubmit = (newDesc, photoId=0) => {

      // rails route given does not include id, need PATCH to <photos_path>/:id
      let fullPhotoPath = show_path + '/photos/' + photoId;
      let data = {
        "photo": {
          "id": photoId,
          "description": newDesc
        }
      }

      // send PATCH
      fetchAndCallback(fullPhotoPath, 'PATCH', JSON.stringify(data), (resp) => {

        if (resp.status === 200) {
          toast.success("Description updated")
          revalidator.revalidate();
        }
        else {
          toast.error("Error updating description")
        }
      });
    }

    onCommentSubmit = (commentText, photoId=0) => {

      let fullPhotoPath = show_path + '/photos/' + photoId;
      let data = {
        "photo": {
          "comment": commentText
        }
      }

      // send PATCH
      fetchAndCallback(fullPhotoPath, 'PATCH', JSON.stringify(data), (resp) => {
        if (resp.status === 200) {
          toast.success("Comment posted")
          revalidator.revalidate();
        } else {
          toast.error("Error posting comment")
        }
      });
    }

    onCommentDelete = (commentId=0) => {
      let data = {
        "comment": {
          "id": commentId
        }
      }
      // send DELETE
      fetchAndCallback(fullPhotoPath, 'DELETE', JSON.stringify(data), (resp) => {
        if (resp.status === 200) {
          toast.success("Comment deleted")
          revalidator.revalidate();
        } else {
          toast.error("Error deleting comment")
        }
      });
    }

    onSharePhoto = () => {
      // TODO: change this route to include specific photo id param
      let sharePhotoPath = '/photos/share_photo'
      let data = {
        "photo" : {
          "share_ids": [] // TODO: extract from UI modal
        }
      }
      fetchAndCallback(sharePhotoPath, 'POST', JSON.stringify(data), (resp) => {
        if (resp.status === 200) {
          toast.success("Photo shared")
          revalidator.revalidate();
        } else {
          toast.error("Error sharing photo")
        }
      });
    }
  }

  return (
    <div>
      <span>{editAlbumLink}</span>
      <br/>
      <h3>{name}</h3>
      <span>{description}</span>
      <br/>
      <div className={`d-flex p-2 flex-wrap ${style.album_container}`}>
        {photos.map((photo) => (


          <Photo name={photo.name}
                 id={photo.id}
                 user_id={photo.user_id}
                 key={photo.id}
                 description={photo.description || ""}
                 image_url={photo.image_url}
                 comments={photo.comments}
                 handleDescSubmit={onDescSubmit}
                 handleCommentSubmit={onCommentSubmit}
                 handleCommentDelete={onCommentDelete}
                 handleSharePhoto={onSharePhoto}
                 className="photo-container"/>
        ))}

      </div>
      <Toaster />
    </div>
  );

};

export default Album;
