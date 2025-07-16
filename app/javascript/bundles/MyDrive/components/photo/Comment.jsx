import PropTypes from 'prop-types';
import React, { useState } from 'react';
import * as style from '../styles/Photo.module.css';
import { useRevalidator } from "react-router-dom";
import { isUserSignedIn } from './tools/loaders.jsx';

const Comment = ({ id,
                   text,
                   author,
                   date,
                   handleDelete=null }) => {

  let button = (
    <></>
  );
  if (handleDelete !== null && isUserSignedIn()) {

    button = (
      <button onClick={deleteOrDoNothing}>X</button>
    );
    // TODO: check if current user id matches comment author id
  }

  const deleteOrDoNothing = () => {
    if (handleDelete !== null) {
      handleDelete(id)
    }
  }

  return (
    <div key={id}
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
