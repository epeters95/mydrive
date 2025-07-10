import PropTypes from 'prop-types';
import React, { useState } from 'react';
import * as style from '../styles/Photo.module.css';
import { useRevalidator } from "react-router-dom";

const Comment = ({ id,
                   text,
                   author,
                   date,
                   handleDelete }) => {

  const revalidator = useRevalidator();

  return (
    <div key={id}
        title={"Posted at " + date}>
      <span><i>{author}:</i>&nbsp;{text}</span>

      <button onClick={handleDelete(id)}>X</button>
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
