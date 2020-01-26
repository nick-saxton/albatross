import React, { useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import { entryOperations, entrySelectors } from '../../redux/entries';
import { golferOperations } from '../../redux/golfers';
import { leagueOperations, leagueSelectors } from '../../redux/leagues';
import { tournamentOperations } from '../../redux/tournaments';

import EntryForm from './EntryForm';

const EditEntry = ({
  entry,
  fetchEntry,
  fetchGolfers,
  fetchLeague,
  fetchTournaments,
  league
}) => {
  const { entryID, leagueID } = useParams();

  useEffect(() => {
    fetchEntry(entryID);
    fetchLeague(leagueID);
    fetchTournaments();
    fetchGolfers();
  }, [entryID, fetchGolfers, fetchLeague, fetchTournaments, leagueID]);

  const initialValues = useMemo(() => {
    if (entry) {
      return {
        ...entry,
        picks: Object.keys(entry.picks).reduce((prev, curr) => {
          return { ...prev, [`t_${curr}`]: entry.picks[curr] };
        }, {})
      };
    } else {
      return;
    }
  }, [entry]);

  return (
    <>
      <div className="columns">
        <div className="column">
          <h1 className="title">
            Edit entry {entry && entry.name} for {league && league.name}
          </h1>
        </div>
      </div>
      {league && entry && (
        <EntryForm
          entryID={entry.id}
          initialValues={initialValues}
          leagueID={league.id}
        />
      )}
    </>
  );
};

const mapStateToProps = (state, ownProps) => ({
  entry: entrySelectors.getEntry(state, ownProps.match.params.entryID),
  league: leagueSelectors.getLeague(state, ownProps.match.params.leagueID)
});

const mapDispatchToProps = {
  fetchEntry: entryOperations.getEntry,
  fetchGolfers: golferOperations.fetchGolfers,
  fetchLeague: leagueOperations.fetchLeague,
  fetchTournaments: tournamentOperations.fetchTournaments
};

export default connect(mapStateToProps, mapDispatchToProps)(EditEntry);
