import * as types from './types';

const createLeagueSuccess = league => ({
  type: types.CREATE_LEAGUE_SUCCESS,
  league
});

export { createLeagueSuccess };
