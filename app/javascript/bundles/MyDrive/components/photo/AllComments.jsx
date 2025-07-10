import PropTypes from 'prop-types';
import React from 'react';
import { useLoaderData } from "react-router-dom";

const CommentsList = () => {

  let { comments } = useLoaderData();

  const commentDelete = () => {
    // TODO:
  }

  return (
    <div>
      <h2>Users</h2>
      <ul>
      {comments.map((comment) => (
        <Comment id={comment.id}
                   text={comment.text}
                   author={comment.author}
                   date={comment.date}
                   handleDelete={commentDelete} />
      ))}
      </ul>
    </div>
  );

};

export default UsersList;
