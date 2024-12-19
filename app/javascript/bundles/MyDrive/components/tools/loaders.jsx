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

  const listItemLinkIterate = (pathItems) => {

    let showItems = [];

    pathItems.forEach((pathItem) => {

      let title = pathItem[0];
      let path = pathItem[1];

      showItems.push(
        <li class="nav-item">
          <Link to={path}>
            {title}
          </Link>
        </li>
      )
    })
    return (
      <>
        {showItems}
      </>
    )
  }

  let navigationLinks;

  if (isUserSignedIn()) {
    navigationLinks = [
      ["Albums", "/albums"],
      ["New Album", "/albums/new"],
    ]
  }
  else {
    navigationLinks = [
      ["Sign In", "/users/sign_in"],
      ["Sign Up", "/users/sign_up"]
    ]
  }
  return listItemLinkIterate(navigationLinks);
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