import React from 'react';
import PropTypes from 'prop-types';
import { NavLink as Link } from 'react-router-dom';

const Layout = ({ children }) => {

  // const isActive = isUserSignedIn()

  // const isUserSignedIn = () => {
  //   // check browser cookie for user
  // }

  return (
    <section className="max-w-none">
      <header>
        <ul>
          <li>
            <Link end to="/">
              Home
            </Link>
          </li>
          <li>
            <Link to="/users/sign_in" className={({ isActive }) => (!isActive ? ' activated' : '')}>
              Sign In
            </Link>
          </li>
          <li>
            <Link to="/users/sign_up" className={({ isActive }) => (!isActive ? ' activated' : '')}>
              Sign Up
            </Link>
          </li>
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