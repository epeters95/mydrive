import React from 'react';
import Photo from './photo/Photo.jsx'
import * as style from './styles/Photo.module.css';

import { useLoaderData } from "react-router-dom";


const LandingPage = () => {

  let { photo, comments } = useLoaderData();

  let commentDiv = <></>;

  if (comments !== undefined && comments.length > 0) {

    comment = comments[0];

    commentDiv = (
      <Comment id={comment.id}
               key={comment.id}
               user_id={comment.user_id}
               text={comment.text}
               author={comment.author}
               date={comment.date} />
    )

  }

  return (
    <div>
      <h1>MyDrive</h1>
      <p>Welcome!</p>

      <p>Latest Commented Photo:</p>
      <Photo name={photo.name}
                 id={photo.id}
                 user_id={photo.user_id}
                 key={photo.id}
                 description={photo.description || ""}
                 image_url={photo.image_url}
                 comments={photo.comments}
                 className="photo-container"/>

      <p>Latest Comment:</p>
      {commentDiv}
    </div>
  );

}

export default LandingPage;