import * as types from './types';

const entryReducer = (state = {}, action) => {
  switch (action.type) {
    case types.ADD_ENTRIES:
      return action.entries;

    case types.ADD_ENTRY:
      return {
        ...state,
        [action.entry.id]: action.entry
      };

    default:
      return state;
  }
};

export default entryReducer;
