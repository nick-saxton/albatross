import { Formik } from 'formik';
import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { authOperations } from '../../redux/auth';

import CenteredHero from '../CenteredHero';
import TextField from '../form/TextField';

const SignUp = ({ registerUser }) => {
  const history = useHistory();

  return (
    <CenteredHero>
      <Formik
        initialValues={{
          email: '',
          firstName: '',
          lastName: '',
          password: '',
          passwordConfirm: ''
        }}
        validate={values => {
          const errors = {};

          // Required fields validation
          if (!values.firstName) {
            errors.firstName = 'Required';
          }
          if (!values.lastName) {
            errors.lastName = 'Required';
          }
          if (!values.email) {
            errors.email = 'Required';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          }
          if (!values.password) {
            errors.password = 'Required';
          } else if (values.password.length < 8) {
            errors.password = 'Password must be at least 8 characters long';
          }
          if (!values.passwordConfirm) {
            errors.passwordConfirm = 'Required';
          }

          if (values.password !== values.passwordConfirm) {
            errors.passwordConfirm = 'Passwords must match';
          }

          return errors;
        }}
        onSubmit={(values, { setErrors }) => {
          return registerUser(values)
            .then(() => {
              history.push('/login', { fromRegister: true });
            })
            .catch(error => {
              setErrors({
                error
              });
            });
        }}
      >
        {({ errors, handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit}>
            <TextField
              label="First Name"
              name="firstName"
              smallLabel={true}
              type="text"
            />
            <TextField
              label="Last Name"
              name="lastName"
              smallLabel={true}
              type="text"
            />
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
            <TextField
              label="Confirm Password"
              name="passwordConfirm"
              smallLabel={true}
              type="password"
            />
            {errors.error && (
              <article className="message is-danger">
                <div className="message-body">{errors.error}</div>
              </article>
            )}
            <div className="field">
              <div className="control">
                <button
                  className="button is-link is-fullwidth"
                  disabled={isSubmitting}
                  type="submit"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </CenteredHero>
  );
};

const mapDispatchToProps = {
  registerUser: authOperations.registerUser
};

export default connect(null, mapDispatchToProps)(SignUp);
