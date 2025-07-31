import PropTypes from 'prop-types';
import React from 'react';
import Comment from './Comment.jsx';
import { useLoaderData } from "react-router-dom";

const CommentsList = () => {

  let { comments } = useLoaderData();

  return (
    <div>
      <h2>All Comments</h2>
      <ul>
      {comments.map((comment) => (
        <Comment id={comment.id}
                 key={comment.id}
                   user_id={comment.user_id}
                   text={comment.text}
                   author={comment.author}
                   date={comment.date} />
      ))}
      </ul>
    </div>
  );

};

export default CommentsList;
