import PropTypes from 'prop-types';
import React, { useState } from 'react';
import * as style from '../styles/Photo.module.css';
import { useRevalidator } from "react-router-dom";

const Comment = ({ id,
                   text,
                   author,
                   date,
                   handleDelete=null }) => {

  let disabled = "";
  if (handleDelete === null) {
    disabled = "disabled";

    // TODO: disable if comment does not belong to current user
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

      <button disabled={disabled} onClick={deleteOrDoNothing}>X</button>
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
