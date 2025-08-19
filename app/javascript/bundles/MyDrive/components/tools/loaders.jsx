import React from 'react';
import ReactOnRails from 'react-on-rails';
import { useNavigate, NavLink as Link } from 'react-router-dom';
import { baseUrl } from './config.js';
import { fetchAndCallback } from './utils.js'

import { signOutButton, isUserSignedIn, getCurrentUserId } from '../auth/links.jsx'

const getCookie = (key) => {
  const search = '; ' + document.cookie ;
  const keyvalues = search.split(`; ${key}=`);
  if (keyvalues.length === 2) return keyvalues.pop().split(';').shift();
}

const authJson = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'X-CSRF-Token': ReactOnRails.authenticityToken()
}
export const loadNavLinks = () => {

  let formRef;

  const submitForm = () => {
    formRef.dispatchEvent(
      new Event("submit", { bubbles: true, cancelable: true })
    )
  };
  const csrfToken = ReactOnRails.authenticityToken()

  const listItemLinkIterate = (pathItems) => {

    let showItems = [];

    pathItems.forEach((pathItem) => {

      let [ title, path ] = pathItem;

      showItems.push(
        <li className="nav-item" key={title} >
          <Link to={path} className="nav-link">
            {title}
          </Link>
        </li>
      )
    })
    return showItems;
  }

  let navElements = [];

  if (isUserSignedIn()) {
    navElements = navElements.concat(listItemLinkIterate([
      ["Albums", "/albums"],
      ["New Album", "/albums/new"],
      ["Users", "/users"],
      ["Comments", "/comments"]
    ]))
    navElements = navElements.concat([signOutButton]);
  }
  else {
    navElements = navElements.concat(listItemLinkIterate([
      ["Sign In", "/users/sign_in"],
      ["Sign Up", "/users/sign_up"]
    ]))
  }

  return (
    <>
      {navElements}
    </>
  )
}

export const albumsLoader = async () => {
  const fetchOptions = {
    method: 'GET',
    headers: authJson
,  }
  const resp = await fetch(baseUrl + '/albums', fetchOptions);
  return resp;
}

export const editAlbumLoader = async ({ params }) => {
  const fetchOptions = {
    method: 'GET',
    headers: authJson
  }
  const resp = await fetch(baseUrl + '/albums/' + params.albumId, fetchOptions);
  return resp;
}

export const allUsersLoader = async () => {
  const fetchOptions = {
    method: 'GET',
    headers: authJson
  }
  const resp = await fetch(baseUrl + '/users', fetchOptions);
  return resp;
}

export const allCommentsLoader = async () => {
  const fetchOptions = {
    method: 'GET',
    headers: authJson
  }
  const resp = await fetch(baseUrl + '/comments', fetchOptions);
  return resp;
}


export const latestCommentedPhotoLoader = async () => {
  const fetchOptions = {
    method: 'GET',
    headers: authJson
  }
  const resp = await fetch(baseUrl + '/photos/latest_commented', fetchOptions);
  return resp;
}