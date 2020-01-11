import { Formik } from 'formik';
import React, { useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';

import { leagueOperations } from '../../redux/leagues';
import {
  tournamentOperations,
  tournamentSelectors
} from '../../redux/tournaments';

import Autocomplete from '../form/Autocomplete';
import CheckboxField from '../form/CheckboxField';
import DateField from '../form/DateField';
import SelectField from '../form/SelectField';
import TextField from '../form/TextField';

const golfersPerTournamentOptions = [1, 2, 3, 4, 5].map(n => ({
  label: n,
  value: n
}));

const LeagueSchema = Yup.object().shape({
  name: Yup.string()
    .max(50, 'League name must be no longer than 50 characters')
    .required('Required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters long')
    .when('private', { is: true, then: Yup.string().required('Required') }),
  tournaments: Yup.array()
    .min(1, 'Must select at least one tournament')
    .required('Required'),
  paymentDueDate: Yup.date()
    .when('paymentRequired', {
      is: true,
      then: Yup.date().required('Required')
    })
    .min(new Date(), 'Payment due date cannot be in the past')
});

const CreateLeague = ({ createLeague, fetchTournaments, tournaments }) => {
  const history = useHistory();

  useEffect(() => {
    if (Object.keys(tournaments).length === 0) {
      fetchTournaments();
    }
  }, [fetchTournaments, tournaments]);

  const tournamentOptions = useMemo(() => {
    return Object.values(tournaments)
      .map(tournament => ({
        label: tournament.name,
        value: tournament.id
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [tournaments]);

  return (
    <>
      <div className="columns">
        <div className="column">
          <h1 className="title">Create a league</h1>
        </div>
      </div>
      <div className="columns">
        <div className="column is-half">
          <Formik
            initialValues={{
              name: '',
              private: false,
              password: '',
              tournaments: [],
              golfersPerTournament: 3,
              paymentRequired: false,
              paymentDueDate: ''
            }}
            validationSchema={LeagueSchema}
            onSubmit={values => {
              createLeague(values);
              history.push('/');
            }}
          >
            {({ handleSubmit, isSubmitting, values }) => (
              <form onSubmit={handleSubmit}>
                <TextField label="League Name" name="name" type="text" />
                <CheckboxField label="Private" name="private" />
                {values.private && (
                  <TextField label="Password" name="password" type="password" />
                )}
                <Autocomplete
                  label="Tournaments"
                  multiple={true}
                  name="tournaments"
                  options={tournamentOptions}
                />
                <SelectField
                  label="Golfers per tournament"
                  name="golfersPerTournament"
                  options={golfersPerTournamentOptions}
                />
                <CheckboxField
                  label="Payment required"
                  name="paymentRequired"
                />
                {values.paymentRequired && (
                  <DateField label="Payment due date" name="paymentDueDate" />
                )}
                <div className="field">
                  <div className="control">
                    <button
                      className="button is-link"
                      disabled={isSubmitting}
                      type="submit"
                    >
                      Create League
                    </button>
                  </div>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = state => ({
  tournaments: tournamentSelectors.getTournaments(state)
});

const mapDispatchToProps = {
  createLeague: leagueOperations.createLeague,
  fetchTournaments: tournamentOperations.fetchTournaments
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateLeague);
