import PropTypes from 'prop-types';
import React, { useState } from 'react';
import * as style from '../styles/Photo.module.css';
import { useRevalidator } from "react-router-dom";

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
                 handleCommentSubmit }) => {

  const revalidator = useRevalidator();

  const [desc, setDesc] = useState(description);

  const descSubmit = (val, id) => {
    setDesc(val);
    handleDescSubmit(val, id);
  }

  const commentSubmit = (event) => {

    let commentField = event.target.parentElement.querySelector("input.comment-field")
    if (commentField.value !== "" && commentField.value !== null) {
      handleCommentSubmit(commentField.value, id)
      revalidator.revalidate();
    }
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
        defaultValue={desc} />
      <br/>
      <button onClick={descSubmit}>Save</button>

      <br/>
      <p><b>Comments:&nbsp;{comments.length}</b></p>
      <ul className="comments-list">
        {comments.map((comment) => (
          <li key={comment.date}
              title={"Posted at " + comment.date}>
            <span><i>{comment.author}:</i>&nbsp;{comment.text}</span>
          </li>
        ))}
      </ul>
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
