import { db } from '../../firebase';

import { addEntries, addEntry } from './actions';

import { authSelectors } from '../auth';

const getEntries = leagueID => dispatch => {
  db.collection('entries')
    .where('league', '==', leagueID)
    .get()
    .then(docs => {
      const entries = {};
      docs.forEach(doc => {
        entries[doc.id] = { ...doc.data(), id: doc.id };
      });
      dispatch(addEntries(entries));
    });
};

const getEntry = entryID => dispatch => {
  db.collection('entries')
    .doc(entryID)
    .get()
    .then(doc => {
      dispatch(addEntry({ ...doc.data(), id: entryID }));
    });
};

const saveEntry = (entry, leagueID) => (dispatch, getState) => {
  db.collection('entries')
    .add({
      ...entry,
      picks: Object.keys(entry.picks).reduce((prev, curr) => {
        return { ...prev, [curr.split('t_')[1]]: entry.picks[curr] };
      }, {}),
      league: leagueID,
      owner: authSelectors.getUser(getState()).uid
    })
    .then(doc => {
      dispatch(
        addEntry({
          ...doc.data(),
          id: doc.id
        })
      );
    })
    .catch(error => console.log(error));
};

export { getEntries, getEntry, saveEntry };
