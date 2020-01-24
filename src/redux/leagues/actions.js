import * as types from './types';

const createLeagueSuccess = league => ({
  type: types.CREATE_LEAGUE_SUCCESS,
  league
});

const initializeLeague = league => ({
  type: types.INITIALIZE_LEAGUE,
  league
});

const initializeLeagues = leagues => ({
  type: types.INITIALIZE_LEAGUES,
  leagues
});

export { createLeagueSuccess, initializeLeague, initializeLeagues };
