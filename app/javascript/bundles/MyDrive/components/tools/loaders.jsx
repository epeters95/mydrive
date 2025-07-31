import React from 'react';
import ReactOnRails from 'react-on-rails';
import { useNavigate, NavLink as Link } from 'react-router-dom';
import { baseUrl } from './config.js';
import { fetchAndCallback } from './utils.js'


export const isUserSignedIn = () => {
  // check browser cookie for user
  // TODO: replace with more secure state management
  if(document.cookie.includes("signed_in=true")) {
    return true;
  }
}

export const getCurrentUserId = () => {
  let userId = getCookie("current_user_id")
  if (userId !== null) {
    return parseInt(userId)
  } else {
    return -1;
  }
}

const getCookie = (key) => {
  const search = '; ' + document.cookie ;
  const keyvalues = search.split(`; ${key}=`);
  if (keyvalues.length === 2) return keyvalues.pop().split(';').shift();
}

export const loadNavLinks = () => {


  let formRef;

  const submitForm = () => {
    formRef.dispatchEvent(
      new Event("submit", { bubbles: true, cancelable: true })
    )
  };

  const csrfToken = ReactOnRails.authenticityToken()

  const signOutButton = (
    <li className="nav-item" key="signout">
      <form ref={(ref) => formRef = ref} className="button_to" method="post" action="/users/sign_out">
        <input type="hidden" name="_method" value="delete"/>
        <input type="hidden" name="authenticity_token" value={csrfToken} />
        <a href="#"
           className="nav-link"
           onClick={submitForm}>
           Log Out
        </a>
      </form>
    </li>
  );

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
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-CSRF-Token': ReactOnRails.authenticityToken()
    }
,  }
  const resp = await fetch(baseUrl + '/albums', fetchOptions);
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

export const allUsersLoader = async () => {
  const fetchOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-CSRF-Token': ReactOnRails.authenticityToken()
    }
  }
  const resp = await fetch(baseUrl + '/users', fetchOptions);
  return resp;
}

export const allCommentsLoader = async () => {
  const fetchOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-CSRF-Token': ReactOnRails.authenticityToken()
    }
  }
  const resp = await fetch(baseUrl + '/comments', fetchOptions);
  return resp;
}