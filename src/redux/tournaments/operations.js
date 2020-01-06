import { initializeTournaments } from './actions';

const fetchTournaments = () => dispatch => {
  fetch('https://statdata.pgatour.com/r/current/schedule-v2.json')
    .then(resp => resp.json())
    .then(json => {
      const tournaments = json.years[1].tours[0].trns
        .filter(tournament => tournament.format === 'Stroke')
        .map(tournament => ({
          id: tournament.permNum,
          name: tournament.trnName.short,
          startDate: new Date(`${tournament.date.start} 00:00`),
          endDate: new Date(`${tournament.date.end} 23:59`)
        }));

      dispatch(initializeTournaments(tournaments));
    });
};

export { fetchTournaments };
