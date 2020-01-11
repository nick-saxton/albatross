import * as types from './types';

const createLeagueSuccess = league => ({
  type: types.CREATE_LEAGUE_SUCCESS,
  league
});

const initializeLeagues = leagues => ({
  type: types.INITIALIZE_LEAGUES,
  leagues
});

export { createLeagueSuccess, initializeLeagues };
