import React from 'react';
import PropTypes from 'prop-types';
import { NavLink as Link } from 'react-router-dom';

const Layout = ({ children }) => {

  // const isActive = isUserSignedIn()

  const isUserSignedIn = () => {
    // check browser cookie for user
    if(localStorage.getItem("auth_token")) {
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

  return (
    <section className="max-w-none">
      <header>
        <ul>
          <li>
            <Link to="/">
              Home
            </Link>
          </li>
          { navigationLinks }
        </ul>
      </header>
      {children}
    </section>
  );

}


Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object]).isRequired
}

export default Layout;