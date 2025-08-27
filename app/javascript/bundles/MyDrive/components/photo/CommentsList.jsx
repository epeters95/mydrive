import PropTypes from 'prop-types';
import React from 'react';
import Comment from './Comment.jsx';
import { useLoaderData, useLocation, Link } from "react-router-dom";

const CommentsList = () => {

  let { comments } = useLoaderData();

  let location = useLocation();

  let heading = <h2>All Comments</h2>;
  let subHeading = <b><Link to="/comments/latest_comments">Latest</Link></b>;

  if (location.pathname.includes("latest_comments")) {
    heading = <h2>Latest Comments</h2>;
    subHeading = <Link to="/comments">All Comments</Link>
  }
  return (
    <div>
      {heading}
      <br/>
      {subHeading}
      <br/>
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
