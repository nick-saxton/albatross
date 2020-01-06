import * as types from './types';

const initializeTournaments = tournaments => ({
  type: types.INITIALIZE_TOURNAMENTS,
  tournaments
});

export { initializeTournaments };
