import { combineReducers } from 'redux';

import authReducer from './auth';
import tournamentReducer from './tournaments';
import leagueReducer from './leagues';

export default combineReducers({
  auth: authReducer,
  leagues: leagueReducer,
  tournaments: tournamentReducer
});
