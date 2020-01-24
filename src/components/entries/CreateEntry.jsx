import { Formik } from 'formik';
import React, { useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import { golferOperations, golferSelectors } from '../../redux/golfers';
import { leagueOperations, leagueSelectors } from '../../redux/leagues';
import {
  tournamentOperations,
  tournamentSelectors
} from '../../redux/tournaments';

import Autocomplete from '../form/Autocomplete';
import TextField from '../form/TextField';

const CreateEntry = ({
  fetchGolfers,
  fetchLeague,
  fetchTournaments,
  golfers,
  league,
  tournaments
}) => {
  const { leagueID } = useParams();

  useEffect(() => {
    fetchLeague(leagueID);
    fetchTournaments();
    fetchGolfers();
  }, [fetchGolfers, fetchLeague, fetchTournaments, leagueID]);

  const golferOptions = useMemo(() => {
    return Object.values(golfers)
      .map(golfer => ({
        label: golfer.name,
        value: golfer.id
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [golfers]);

  const leagueTournaments = useMemo(() => {
    return league
      ? league.tournaments.sort(
          (a, b) =>
            new Date(tournaments[a].startDate) -
            new Date(tournaments[b].startDate)
        )
      : [];
  }, [league, tournaments]);

  return (
    <>
      <div className="columns">
        <div className="column">
          <h1 className="title">Create an entry for {league && league.name}</h1>
        </div>
      </div>
      {league && tournaments && (
        <div className="columns">
          <div className="column is-half">
            <Formik
              initialValues={{
                name: '',
                picks: league.tournaments.reduce((prev, curr) => {
                  return { ...prev, [curr]: [] };
                }, {})
              }}
              onSubmit={values => {}}
            >
              {({ handleSubmit, isSubmitting, values }) => (
                <form onSubmit={handleSubmit}>
                  <TextField
                    label="Entry Name"
                    name="name"
                    style={{ marginBottom: '0.75rem' }}
                    type="text"
                  />
                  <h2 className="title is-5">
                    Tournament Picks (
                    {`Pick ${league.golfersPerTournament} golfers per tournament`}
                    )
                  </h2>
                  {leagueTournaments.map(tournament => (
                    <Autocomplete
                      key={tournament}
                      label={tournaments[tournament].name}
                      multiple={true}
                      name={`picks[${tournament}]`}
                      options={golferOptions}
                    />
                  ))}
                  <div className="field">
                    <div className="control">
                      <button
                        className="button is-link"
                        disabled={isSubmitting}
                        type="submit"
                      >
                        Create Entry
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state, ownProps) => ({
  golfers: golferSelectors.getGolfers(state),
  league: leagueSelectors.getLeague(state, ownProps.match.params.leagueID),
  tournaments: tournamentSelectors.getTournaments(state)
});

const mapDispatchToProps = {
  fetchGolfers: golferOperations.fetchGolfers,
  fetchLeague: leagueOperations.fetchLeague,
  fetchTournaments: tournamentOperations.fetchTournaments
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateEntry);
