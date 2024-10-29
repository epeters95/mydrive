import React from 'react';
import PropTypes from 'prop-types';
import { NavLink as Link } from 'react-router-dom';

const Layout = ({ children }) => {

  return (
    <section className="max-w-none">
      <header>
        <ul>
          <li>
            <Link end to="/" className={({ isActive }) => (isActive ? ' activated' : '')}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/users/sign_in" className={({ isActive }) => (isActive ? ' activated' : '')}>
              Sign In
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