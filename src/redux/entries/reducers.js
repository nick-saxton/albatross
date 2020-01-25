import * as types from './types';

const entryReducer = (state = {}, action) => {
  switch (action.type) {
    case types.ADD_ENTRIES:
      return action.entries;

    default:
      return state;
  }
};

export default entryReducer;
