import PropTypes from 'prop-types';
import React, { useState } from 'react';
import * as style from '../styles/Comment.module.css';
import { useRevalidator } from "react-router-dom";

const Comment = ({ id,
                   text,
                   author,
                   date,
                   isDeletable=false,
                   handleDelete=null }) => {

  let button = (
    <></>
  );
  if (isDeletable) {

    button = (
      <button onClick={deleteOrDoNothing}>X</button>
    );
  }

  const deleteOrDoNothing = () => {
    if (handleDelete !== null) {
      handleDelete(id)
    }
  }

  return (
    <div className="comment-container"
         key={id}
         title={"Posted at " + date}>
      <span><i>{author}:</i>&nbsp;{text}</span>
      {button}
    </div>
  );
};

Comment.propTypes = {
  id:               PropTypes.number.isRequired,
  text:             PropTypes.string.isRequired,
  author:           PropTypes.string.isRequired,
  date:             PropTypes.string.isRequired,
  handleDelete:     PropTypes.func
};

export default Comment;
