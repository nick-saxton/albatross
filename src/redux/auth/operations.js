import {
  logInSuccess,
  logOutSuccess,
  verifyRequest,
  verifySuccess
} from './actions';

import { fb } from '../../firebase';

const logIn = formValues => dispatch => {
  const { email, password } = formValues;
  return fb
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(resp => {
      dispatch(logInSuccess(resp.user));
    })
    .catch(error => {
      throw error.message;
    });
};

const logOut = () => dispatch => {
  fb.auth()
    .signOut()
    .then(() => dispatch(logOutSuccess()))
    .catch(error => {
      throw error.message;
    });
};

const registerUser = formValues => () => {
  const { email, password } = formValues;
  return fb
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .catch(error => {
      throw error.message;
    });
};

const verifyAuth = () => dispatch => {
  dispatch(verifyRequest());
  fb.auth().onAuthStateChanged(user => {
    if (user !== null) {
      dispatch(logInSuccess(user));
    }
    dispatch(verifySuccess());
  });
};

export { logIn, logOut, registerUser, verifyAuth };
