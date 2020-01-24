import * as types from './types';

const golfersReducer = (state = {}, action) => {
  switch (action.type) {
    case types.INITIALIZE_GOLFERS:
      return action.golfers;

    default:
      return state;
  }
};

export default golfersReducer;
