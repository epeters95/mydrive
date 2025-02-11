import PropTypes from 'prop-types';
import React, { useState } from 'react';
import * as style from '../styles/Photo.module.css';

const Photo = ({id, description, name, image_url, handleDescChange}) => {

  const [desc, setDesc] = useState(description);

  const descChange = (val, id) => {
    setDesc(val);
    handleDescChange(val, id);
  } 

  const keypressUpdate = debounce((event) => { descChange(e.target.value, id) }, 100);

  return (
    <div className={style.albums_image}>
      <p className={style.img_name} title={name}>
        {name}
      </p>
      <img src={image_url} alt={desc}/>
      <br/>
      <input value={desc}
             onChange={keypressUpdate}
      />
    </div>
  );
};

Photo.propTypes = {
  id:               PropTypes.number,
  name:             PropTypes.string.isRequired,
  image_url:        PropTypes.string.isRequired,
  description:      PropTypes.string,
  handleDescChange: PropTypes.func
};

export default Photo;
