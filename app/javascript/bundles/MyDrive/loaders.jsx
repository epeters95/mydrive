import React from 'react';
import ReactOnRails from 'react-on-rails';
import { NavLink as Link } from 'react-router-dom';
import { baseUrl } from './config.js';

export const loadNavLinks = () => {

  const isUserSignedIn = () => {
    // check browser cookie for user
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
          <Link to="/users/sign_out">
            Sign Out
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

  const resp = await fetch(baseUrl + '/albums', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': ReactOnRails.authenticityToken()
    }
  });
  const respJson = await resp.json();
  return respJson;
}

export const editAlbumLoader = async ({ params }) => {
  const resp = await fetch(baseUrl + '/albums/' + params.albumId, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': ReactOnRails.authenticityToken()
    }
  });
  const respJson = await resp.json();
  return respJson;
}