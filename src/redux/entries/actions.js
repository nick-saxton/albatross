import * as types from './types';

const addEntry = entry => ({
  type: types.ADD_ENTRY,
  entry
});

const addEntries = entries => ({
  type: types.ADD_ENTRIES,
  entries
});

export { addEntries, addEntry };
