import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Comment from './Comment.jsx';
import * as style from '../styles/Photo.module.css';

function debounce(func, timeout = 300){
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}

const Photo = ({ id,
                 description,
                 name,
                 image_url,
                 comments,
                 handleDescSubmit,
                 handleCommentSubmit,
                 handleCommentDelete }) => {


  const [desc, setDesc] = useState(description);

  const descSubmit = (val, id) => {
    setDesc(val);
    handleDescSubmit(val, id);
  }

  const commentSubmit = (event) => {

    let commentField = event.target.parentElement.querySelector("input.comment-field")
    if (commentField.value !== "" && commentField.value !== null) {
      handleCommentSubmit(commentField.value, id)
    }
  };

  const commentDelete = (commentId) => {
    return () => {
      handleCommentDelete(commentId)
    }
  }

  return (
    <div className={style.albums_image}>
      <p className={style.img_name} title={name}>
        {name}
      </p>
      <img src={image_url} alt={desc}/>
      <br/>
      <textarea
        rows="5" cols="33"
        defaultValue={desc} />
      <br/>
      <button onClick={descSubmit}>Save</button>

      <br/>
      <p><b>Comments:&nbsp;{comments.length}</b></p>
      <div className="comments-list">
        {comments.map((comment) => (
          <Comment key={comment.id}
                   id={comment.id}
                   text={comment.text}
                   author={comment.author}
                   date={comment.date}
                   handleDelete={commentDelete} />
        ))}
      </div>
      <br/>
      <p>Add a Comment:</p>
      <input type="text" className="comment-field" />
      <button onClick={commentSubmit}>Post Comment</button>
    </div>
  );
};

Photo.propTypes = {
  id:               PropTypes.number,
  name:             PropTypes.string.isRequired,
  image_url:        PropTypes.string.isRequired,
  description:      PropTypes.string,
  handleDescChange: PropTypes.func
};

export default Photo;
