import PropTypes from 'prop-types';
import React, { useState } from 'react';
import * as style from './Photo.module.css';

const Photo = (props) => {

  const [desc, setDesc] = useState(props.description);

  function descChange() {
    setDesc()
  }

  return (
    <div className={style.albums_image}>
      <p className={style.img_name} title={props.name}>
        {props.name}
      </p>
      <img src={props.image_url} alt={props.description}/>
      <br/>
      <input value={desc}
             onChange={e => { setDesc(e.target.value) }}
      />
    </div>
  );
};

Photo.propTypes = {
  name:         PropTypes.string.isRequired,
  image_url:    PropTypes.string.isRequired,
  description:  PropTypes.string
};

export default Photo;
