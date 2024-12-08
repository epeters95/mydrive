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

  let navigationLinks;

  const onSignOutClicked = () => {
    fetchAndCallback(baseUrl + "/users/sign_out", "DELETE", fetchOptions, (resp) => {
      if (resp.status === 200) {
        console.log("Sign out success");
      } else {
        console.log("Error signing out");
      }
    });
      
  }

  if (isUserSignedIn()) {
    navigationLinks = (
      <>
        <li>
          <Link to="/albums">
            Albums
          </Link>
        </li>
        <li>
          <button className="submit" onClick={onSignOutClicked}>
            Sign Out
          </button>
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