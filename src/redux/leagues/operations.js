import { db } from '../../firebase';

import {
  createLeagueSuccess,
  initializeLeague,
  initializeLeagues
} from './actions';

import { authSelectors } from '../auth';

const createLeague = formData => (dispatch, getState) => {
  const leagueData = { ...formData };

  if (!leagueData.private) {
    delete leagueData.password;
  }
  if (!leagueData.paymentRequired) {
    delete leagueData.paymentDueDate;
  } else {
    leagueData.paymentDueDate = new Date(leagueData.paymentDueDate + ' 23:59');
  }

  const user = authSelectors.getUser(getState());
  leagueData.owner = user.uid;

  db.collection('leagues')
    .add(leagueData)
    .then(docRef => {
      dispatch(
        createLeagueSuccess({
          ...leagueData,
          id: docRef.id
        })
      );
    })
    .catch(error => console.log(error));
};

const fetchLeague = leagueID => dispatch => {
  db.collection('leagues')
    .doc(leagueID)
    .get()
    .then(doc => {
      dispatch(
        initializeLeague({
          ...doc.data(),
          id: leagueID
        })
      );
    });
};

const fetchLeagues = () => dispatch => {
  db.collection('leagues')
    .get()
    .then(results => {
      const leagues = {};
      results.forEach(doc => (leagues[doc.id] = { ...doc.data(), id: doc.id }));
      dispatch(initializeLeagues(leagues));
    });
};

export { createLeague, fetchLeague, fetchLeagues };
