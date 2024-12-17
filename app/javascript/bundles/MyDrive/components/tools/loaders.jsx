import React from 'react';
import ReactOnRails from 'react-on-rails';
import { useNavigate, NavLink as Link } from 'react-router-dom';
import { baseUrl } from './config.js';
import { fetchAndCallback } from './utils.js'

export const loadNavLinks = () => {

  const isUserSignedIn = () => {
    // check browser cookie for user
    // TODO: replace with more secure state management
    if(document.cookie.includes("signed_in=true")) {
      return true;
    }
  }

  let navigationLinks;

  if (isUserSignedIn()) {
    navigationLinks = (
      <>
        <li>
          <Link to="/albums">
            Albums
          </Link>
        </li>
        <li>
          <Link to="/albums/new">
            New Album
          </Link>
        </li>
      </>
    );
  }
  else {
    navigationLinks = (
      <>
        <li>
          <Link to="/users/sign_in">
            Sign In
          </Link>
        </li>
        <li>
          <Link to="/users/sign_up">
            Sign Up
          </Link>
        </li>
      </>
    );
  }
  return navigationLinks;
}

export const albumsLoader = async () => {
  const fetchOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-CSRF-Token': ReactOnRails.authenticityToken()
    }
,  }
  const resp = await fetch(baseUrl + '/get-albums', fetchOptions);
  return resp;
}

export const editAlbumLoader = async ({ params }) => {
  const fetchOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-CSRF-Token': ReactOnRails.authenticityToken()
    }
  }
  const resp = await fetch(baseUrl + '/albums/' + params.albumId, fetchOptions);
  return resp;
}