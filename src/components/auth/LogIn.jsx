import { Formik } from 'formik';
import React from 'react';
import { connect } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';

import { authOperations, authSelectors } from '../../redux/auth';

import CenteredHero from '../CenteredHero';
import TextField from '../form/TextField';

const LogIn = ({ hasLoggedOut, logIn }) => {
  const history = useHistory();
  const location = useLocation();

  return (
    <CenteredHero>
      {location.search.indexOf('registered') !== -1 && (
        <article className="message is-success">
          <div className="message-body">
            Successfully registered! You may now log in.
          </div>
        </article>
      )}
      {hasLoggedOut && (
        <article className="message is-success">
          <div className="message-body">Successfully logged out.</div>
        </article>
      )}
      <Formik
        initialValues={{
          email: '',
          password: ''
        }}
        onSubmit={(values, { setErrors, setSubmitting }) => {
          logIn(values)
            .then(() => history.push('/'))
            .catch(error => {
              setErrors({ error });
              setSubmitting(false);
            });
        }}
      >
        {({ errors, handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit}>
            {errors.error && (
              <article className="message is-danger">
                <div className="message-body">{errors.error}</div>
              </article>
            )}
            <TextField
              label="Email"
              name="email"
              smallLabel={true}
              type="email"
            />
            <TextField
              label="Password"
              name="password"
              smallLabel={true}
              type="password"
            />
            <div className="field">
              <div className="control">
                <button
                  className="button is-link is-fullwidth"
                  disabled={isSubmitting}
                  type="submit"
                >
                  Log In
                </button>
              </div>
            </div>
            <div className="field">
              <div className="control">
                <Link
                  className="button is-success is-outlined is-fullwidth"
                  to="/signup"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </CenteredHero>
  );
};

const mapStateToProps = state => ({
  hasLoggedOut: authSelectors.hasLoggedOut(state)
});

const mapDispatchToProps = {
  logIn: authOperations.logIn
};

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
