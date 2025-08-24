import React from 'react';
import PropTypes from 'prop-types';
import { Outlet, useLoaderData, NavLink as Link } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary.jsx';
import * as style from './styles/Layout.module.css'

const Layout = ({ children }) => {

  let navigationLinks = useLoaderData();

  return (
    <section className="max-w-none">
      <header>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="navbar-collapse collapse">

            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              { navigationLinks }
            </ul>
            
          </div>
        </nav>
      </header>
      <div className="container">
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </div>
    </section>
  );

}


Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object])
}

export default Layout;