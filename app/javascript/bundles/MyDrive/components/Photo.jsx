import PropTypes from 'prop-types';
import React, { useState } from 'react';
import * as style from './Photo.module.css';

const Photo = ({id, description, name, image_url, handleDescChange}) => {

  return (
    <div className={style.albums_image}>
      <p className={style.img_name} title={name}>
        {name}
      </p>
      <img src={image_url} alt={description}/>
      <br/>
      <input value={description}
             onChange={e => { handleDescChange(e.target.value, id) }}
      />
    </div>
  );
};

Photo.propTypes = {
  name:             PropTypes.string.isRequired,
  image_url:        PropTypes.string.isRequired,
  description:      PropTypes.string,
  handleDescChange: PropTypes.func
};

export default Photo;
