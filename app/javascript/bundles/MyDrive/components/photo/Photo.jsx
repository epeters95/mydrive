import PropTypes from 'prop-types';
import React, { useState } from 'react';
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
                 handleDescChange,
                 handleCommentSubmit }) => {

  const [desc, setDesc] = useState(description);

  const descChange = (val, id) => {
    setDesc(val);
    handleDescChange(val, id);
  } 
  
  const keypressUpdate = (event) => {
    descChange(event.target.value, id)
  };

  const commentSubmit = (event) => { 

    let commentField = event.target.parentElement.querySelector("input.comment-field")
    handleCommentSubmit(commentField.value, id)
  };

  return (
    <div className={style.albums_image}>
      <p className={style.img_name} title={name}>
        {name}
      </p>
      <img src={image_url} alt={desc}/>
      <br/>
      <textarea
        rows="5" cols="33"
        onChange={keypressUpdate}
        value={desc} />

      <br/>
      <p><b>Comments:&nbsp;{comments.length}</b></p>
      <ul className="comments-list">
        {comments.map((comment) => (
          <li key={comment.id}>{comment.author} at {comment.date}: {comment.text}</li>
        ))}
      </ul>
      <p>Add a Comment:</p>
      <input type="text" className="comment-field" />
      <button onClick={commentSubmit}>Submit</button>
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
