import { Formik } from 'formik';
import React, { useEffect, useMemo } from 'react';
import { connect } from 'react-redux';

import {
  tournamentOperations,
  tournamentSelectors
} from '../../redux/tournaments';

import Autocomplete from '../form/Autocomplete';
import CheckboxField from '../form/CheckboxField';
import TextField from '../form/TextField';

const CreateLeague = ({ fetchTournaments, tournaments }) => {
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
              paymentDueDate: null
            }}
            onSubmit={values => console.log(values)}
          >
            {({ errors, values }) => (
              <form>
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
  fetchTournaments: tournamentOperations.fetchTournaments
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateLeague);
