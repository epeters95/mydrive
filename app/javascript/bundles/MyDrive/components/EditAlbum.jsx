import PropTypes from 'prop-types';
import React from 'react';


const EditAlbum = ({ album }) => {
  
  return (
    <div>
      <h2>Edit Album - {album.name}</h2>
      <br>
      <span><a href={album.path}>View</a></span>

      <br>
      <div class="error"><%= flash[:errors] %></div>
      <br>
      <label for='album_name'>Name</label>
      <input type='text'
             id='album_name'
             name='album[name]'
             value={album.name} />

      <label for='album_description'>Description</label>
      <textarea id='album_description'
                name='album[album_description]'>
                {album.description}
      </textarea>
      <br>
      <p>Add a new image:</p>
      <input multiple="multiple" type="file" name="album[images][]" id="album_images">
      <input type="submit" name="commit" value="Update" data-disable-with="Update">
    </div>
  );

};

EditAlbum.propTypes = {
  albums:       PropTypes.array
};

export default EditAlbum;
