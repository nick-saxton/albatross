import * as types from './types';

const logInSuccess = user => ({
  type: types.LOGIN_SUCCESS,
  user
});

const logOutSuccess = () => ({
  type: types.LOGOUT_SUCCESS
});

const verifyRequest = () => ({
  type: types.VERIFY_REQUEST
});

const verifySuccess = () => ({
  type: types.VERIFY_SUCCESS
});

export { logInSuccess, logOutSuccess, verifyRequest, verifySuccess };
