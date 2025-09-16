import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Comment from './Comment.jsx';
import * as style from '../styles/Photo.module.css';
import { getCurrentUserId } from '../auth/links.jsx';
import toast, { Toaster } from 'react-hot-toast';

const Photo = ({ id,
                 user_id,
                 description,
                 name,
                 image_url,
                 comments,
                 handleDescSubmit,
                 handleCommentSubmit,
                 handleCommentDelete,
                 handleSharePhoto }) => {


  const [desc, setDesc] = useState(description);

  let descriptionSpan = (
    <span className="desc-span">
      {desc}
    </span>
  );

  const descSubmit = (val, id) => {
    setDesc(val);
    handleDescSubmit(val, id);
  }

  if (getCurrentUserId() === user_id) {
    descriptionSpan = (
      <>
        <textarea
          rows="5" cols="33"
          defaultValue={desc} />
        <br/>
        <button onClick={descSubmit}>Save</button>
      </>
    );
  }

  const commentSubmit = (event) => {

    let commentField = event.target.parentElement.querySelector("input.comment-field")
    if (commentField.value !== "" && commentField.value !== null) {
      handleCommentSubmit(commentField.value, id)
      toast.success("Comment posted")
    }
  };

  const commentDelete = (commentId) => {
    return () => {
      handleCommentDelete(commentId)
      toast.success("Comment deleted")
    }
  }

  const getIsDeletable = (comment) => {
    if (comment.author_id === getCurrentUserId()) {
      return true;
    }
    return false;
  }

  const sharePhoto = (event) => {
    return () => {
      handleSharePhoto(id);
    }
  }

  return (
    <div className={style.albums_image}>
      <p className={style.img_name} title={name}>
        {name}
      </p>
      <img src={image_url} alt={desc}/>
      <br/>
      {descriptionSpan}

      <br/>
      <p><b>Comments:&nbsp;{comments.length}</b></p>
      <div className="comments-list">
        {comments.map((comment) => (
          <Comment key={comment.id}
                   id={comment.id}
                   text={comment.text}
                   author={comment.author}
                   date={comment.date}
                   isDeletable={getIsDeletable(comment)}
                   handleDelete={commentDelete} />
        ))}
      </div>
      <br/>
      <p>Add a Comment:</p>
      <input type="text" className="comment-field" />
      <button onClick={commentSubmit}>Post Comment</button>
      <button onClick={sharePhoto}>Share</button>
      <Toaster />
    </div>
  );
};

Photo.propTypes = {
  id:                  PropTypes.number,
  name:                PropTypes.string.isRequired,
  image_url:           PropTypes.string.isRequired,
  description:         PropTypes.string,
  handleDescChange:    PropTypes.func,
  user_id:             PropTypes.number,
  comments:            PropTypes.array,
  handleDescSubmit:    PropTypes.func,
  handleCommentSubmit: PropTypes.func,
  handleCommentDelete: PropTypes.func
};

export default Photo;
