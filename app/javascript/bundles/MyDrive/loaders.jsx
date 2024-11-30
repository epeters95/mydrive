import React from 'react';
import ReactOnRails from 'react-on-rails';
import { NavLink as Link } from 'react-router-dom';
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

  let csrfToken = ReactOnRails.authenticityToken();

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
          <form method="DELETE" action="/users/sign_out">
            <input type="hidden" name="authenticity_token" value={csrfToken} />
            <input type="submit" value="Sign Out" />
          </form>
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
  const resp = await fetchAndCallback(baseUrl + '/albums', 'GET');
  return resp;
}

export const editAlbumLoader = async ({ params }) => {
  const resp = await fetchAndCallback(baseUrl + '/albums/' + params.albumId, 'GET');
  return resp;
}