import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { authOperations, authSelectors } from '../redux/auth';

const Navbar = ({ isAuthenticated, logOut }) => (
  <nav className="navbar is-black">
    <div className="container">
      <div className="navbar-brand">
        <Link className="navbar-item has-text-weight-bold" to="/">
          Albatross
        </Link>
      </div>
      {isAuthenticated && (
        <div className="navbar-menu">
          <div className="navbar-start"></div>
          <div className="navbar-end">
            <div className="navbar-item">
              <button className="button is-danger is-small" onClick={logOut}>
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  </nav>
);

const mapStateToProps = state => ({
  isAuthenticated: authSelectors.isAuthenticated(state)
});

const mapDispatchToProps = {
  logOut: authOperations.logOut
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
