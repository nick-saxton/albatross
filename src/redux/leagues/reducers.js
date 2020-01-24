import * as types from './types';

const leagueReducer = (state = {}, action) => {
  switch (action.type) {
    case types.CREATE_LEAGUE_SUCCESS: {
      const { league } = action;
      return {
        ...state,
        [league.id]: league
      };
    }

    case types.INITIALIZE_LEAGUE: {
      const { league } = action;
      return {
        ...state,
        [league.id]: league
      };
    }

    case types.INITIALIZE_LEAGUES:
      return action.leagues;

    default:
      return state;
  }
};

export default leagueReducer;
