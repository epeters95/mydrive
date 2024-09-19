import PropTypes from 'prop-types';
import React, { useState } from 'react';
import * as style from './Photo.module.css';

const Photo = (props) => {

  return (
    <div className="p-2 albums_image">
      <p className="img_name" title={props.name}>
        {props.name}
      </p>
      <img src={props.image_url} alt={props.description}/>
    </div>
  );
};

Photo.propTypes = {
  name:         PropTypes.string.isRequired,
  image_url:    PropTypes.string.isRequired,
  description:  PropTypes.string
};

export default Photo;
