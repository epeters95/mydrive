import React from 'react';
import PropTypes from 'prop-types';
import { Outlet, useLoaderData, NavLink as Link } from 'react-router-dom';

const Layout = ({ children }) => {

  let navigationLinks = useLoaderData();
  console.log(navigationLinks)

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
      <div className="container">
        <Outlet />
      </div>
    </section>
  );

}


Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object])
}

export default Layout;