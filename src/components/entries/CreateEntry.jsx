import { Formik } from 'formik';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import { golferOperations } from '../../redux/golfers';
import { leagueOperations, leagueSelectors } from '../../redux/leagues';
import { tournamentOperations } from '../../redux/tournaments';

import EntryForm from './EntryForm';

const CreateEntry = ({
  fetchGolfers,
  fetchLeague,
  fetchTournaments,
  league
}) => {
  const { leagueID } = useParams();

  useEffect(() => {
    fetchLeague(leagueID);
    fetchTournaments();
    fetchGolfers();
  }, [fetchGolfers, fetchLeague, fetchTournaments, leagueID]);
  return (
    <>
      <div className="columns">
        <div className="column">
          <h1 className="title">Create an entry for {league && league.name}</h1>
        </div>
      </div>
      {league && <EntryForm leagueID={league.id} />}
    </>
  );
};

const mapStateToProps = (state, ownProps) => ({
  league: leagueSelectors.getLeague(state, ownProps.match.params.leagueID)
});

const mapDispatchToProps = {
  fetchGolfers: golferOperations.fetchGolfers,
  fetchLeague: leagueOperations.fetchLeague,
  fetchTournaments: tournamentOperations.fetchTournaments
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateEntry);
