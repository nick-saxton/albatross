import * as types from './types';

const tournamentReducer = (state = {}, action) => {
  switch (action.type) {
    case types.INITIALIZE_TOURNAMENTS:
      return action.tournaments.reduce((tournaments, currentTournament) => {
        tournaments[currentTournament.id] = currentTournament;
        return tournaments;
      }, {});

    default:
      return state;
  }
};

export default tournamentReducer;
