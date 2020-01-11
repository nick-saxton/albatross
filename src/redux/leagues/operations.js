import { db } from '../../firebase';

import { createLeagueSuccess, initializeLeagues } from './actions';

const createLeague = formData => dispatch => {
  const leagueData = { ...formData };

  if (!leagueData.private) {
    delete leagueData.password;
  }
  if (!leagueData.paymentRequired) {
    delete leagueData.paymentDueDate;
  } else {
    leagueData.paymentDueDate = new Date(leagueData.paymentDueDate + ' 23:59');
  }

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

const fetchLeagues = () => dispatch => {
  db.collection('leagues')
    .get()
    .then(results => {
      const leagues = {};
      results.forEach(doc => (leagues[doc.id] = doc.data()));
      dispatch(initializeLeagues(leagues));
    });
};

export { createLeague, fetchLeagues };
