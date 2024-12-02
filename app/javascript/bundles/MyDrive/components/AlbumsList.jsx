import PropTypes from 'prop-types';
import React from 'react';
import { useLoaderData, useRevalidator, NavLink as Link} from "react-router-dom";


const AlbumsList = () => {

  let { albums } = useLoaderData();

  const revalidator = useRevalidator();
  
  return (
    <div>
      <h2>All Albums</h2>
      <ul>
      {albums.map((album) => (
        <li id={album.id}
            key={album.id}>
          <Link to={album.path} onClick={revalidator.revalidate}>
            {album.name}
          </Link>
        </li>
      ))}
      </ul>
    </div>
  );

};

export default AlbumsList;
