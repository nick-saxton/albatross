import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import { authSelectors } from '../redux/auth';

const ProtectedRoute = ({
  component: Component,
  isAuthenticated,
  isVerifying,
  ...otherProps
}) => (
  <Route
    {...otherProps}
    render={props =>
      isVerifying ? (
        <div></div>
      ) : isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

const mapStateToProps = state => ({
  isAuthenticated: authSelectors.isAuthenticated(state),
  isVerifying: authSelectors.isVerifying(state)
});

export default connect(mapStateToProps)(ProtectedRoute);
