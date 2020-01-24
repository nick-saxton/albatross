import { combineReducers } from 'redux';

import authReducer from './auth';
import golfersReducer from './golfers';
import tournamentReducer from './tournaments';
import leagueReducer from './leagues';

export default combineReducers({
  auth: authReducer,
  golfers: golfersReducer,
  leagues: leagueReducer,
  tournaments: tournamentReducer
});
