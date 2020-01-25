import { combineReducers } from 'redux';

import authReducer from './auth';
import entryReducer from './entries';
import golfersReducer from './golfers';
import tournamentReducer from './tournaments';
import leagueReducer from './leagues';

export default combineReducers({
  auth: authReducer,
  entries: entryReducer,
  golfers: golfersReducer,
  leagues: leagueReducer,
  tournaments: tournamentReducer
});
