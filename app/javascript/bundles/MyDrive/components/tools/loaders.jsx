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
        <a href="#" onClick={submitForm}>Log Out</a>
      </form>
    </li>
  );

  const listItemLinkIterate = (pathItems) => {

    let showItems = [];

    pathItems.forEach((pathItem) => {

      let title = pathItem[0];
      let path = pathItem[1];

      showItems.push(
        <li className="nav-item" key={title} >
          <Link to={path}>
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