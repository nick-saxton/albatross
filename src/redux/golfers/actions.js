import * as types from './types';

const initializeGolfers = golfers => ({
  type: types.INITIALIZE_GOLFERS,
  golfers
});

export { initializeGolfers };
