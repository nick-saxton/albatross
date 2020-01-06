import * as types from './types';

const initialState = {
  hasLoggedOut: false,
  isAuthenticated: false,
  isVerifying: false,
  user: {}
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.user
      };

    case types.LOGOUT_SUCCESS:
      return {
        ...state,
        hasLoggedOut: true,
        isAuthenticated: false,
        user: {}
      };

    case types.VERIFY_REQUEST:
      return {
        ...state,
        isVerifying: true
      };

    case types.VERIFY_SUCCESS:
      return {
        ...state,
        isVerifying: false
      };

    default:
      return state;
  }
};

export default authReducer;
