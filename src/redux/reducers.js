import { combineReducers } from 'redux';

import authReducer from './auth';
import tournamentReducer from './tournaments';

export default combineReducers({
  auth: authReducer,
  tournaments: tournamentReducer
});
