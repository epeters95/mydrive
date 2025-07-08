import PropTypes from 'prop-types';
import React from 'react';
import { useLoaderData } from "react-router-dom";

const CommentsList = () => {

  let { comments } = useLoaderData();

  return (
    <div>
      <h2>Users</h2>
      <ul>
      {comments.map((comment) => (
        <li id={comment.id}
            key={comment.id}>
          <span className="comment-span">
            {comment.text}:&nbsp;{comment.author}
          </span>
        </li>
      ))}
      </ul>
    </div>
  );

};

export default UsersList;
