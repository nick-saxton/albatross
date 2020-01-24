import { db } from '../../firebase';

import { initializeGolfers } from './actions';

const fetchGolfers = () => dispatch => {
  db.collection('golfers')
    .get()
    .then(results => {
      const golfers = {};
      results.forEach(doc => (golfers[doc.id] = { ...doc.data(), id: doc.id }));
      dispatch(initializeGolfers(golfers));
    });
};

export { fetchGolfers };
