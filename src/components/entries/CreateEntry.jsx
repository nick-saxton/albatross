import { Formik } from 'formik';
import _ from 'lodash';
import React, { useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import * as Yup from 'yup';

import { entryOperations } from '../../redux/entries';
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
  saveEntry,
  tournaments
}) => {
  const { leagueID } = useParams();

  const history = useHistory();

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

  const EntrySchema = useMemo(
    () =>
      Yup.object().shape({
        name: Yup.string()
          .max(50, 'Entry name must be no longer than 50 characters')
          .required('Required'),
        picks: Yup.lazy(obj =>
          Yup.object().shape(
            _.mapValues(obj, () => {
              return Yup.array()
                .min(
                  league.golfersPerTournament,
                  `You must select exactly ${league.golfersPerTournament} golfers for this tournament`
                )
                .max(
                  league.golfersPerTournament,
                  `You must select exactly ${league.golfersPerTournament} golfers for this tournament`
                );
            })
          )
        )
      }),
    [league]
  );

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
                  return { ...prev, [`t_${curr}`]: [] };
                }, {})
              }}
              validationSchema={EntrySchema}
              onSubmit={values => {
                saveEntry(values, league.id);
                history.push(`league/${league.id}`);
              }}
            >
              {({ errors, handleSubmit, isSubmitting, values }) => (
                <form onSubmit={handleSubmit}>
                  <TextField
                    label="Entry Name"
                    name="name"
                    style={{ marginBottom: '0.75rem' }}
                    type="text"
                  />
                  <h2 className="title is-5">
                    Tournament Picks&nbsp;
                    <span className="has-text-weight-normal">
                      (
                      {`Pick ${league.golfersPerTournament} golfers per tournament`}
                      )
                    </span>
                  </h2>
                  {leagueTournaments.map(tournament => (
                    <Autocomplete
                      key={tournament}
                      label={tournaments[tournament].name}
                      multiple={true}
                      name={`picks.t_${tournament}`}
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
  fetchTournaments: tournamentOperations.fetchTournaments,
  saveEntry: entryOperations.saveEntry
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateEntry);
