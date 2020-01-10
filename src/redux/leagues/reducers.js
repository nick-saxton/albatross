import * as types from './types';

const leagueReducer = (state = {}, action) => {
  switch (action.type) {
    case types.CREATE_LEAGUE_SUCCESS:
      return {
        ...state,
        [league.id]: league
      };

    default:
      return state;
  }
};

export default leagueReducer;
