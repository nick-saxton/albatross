import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import {
  tournamentOperations,
  tournamentSelectors
} from '../../redux/tournaments';

import LeagueCard from './LeagueCard';

const Leagues = ({ fetchTournaments, tournaments }) => {
  useEffect(() => {
    if (Object.keys(tournaments).length === 0) {
      fetchTournaments();
    }
  }, [fetchTournaments, tournaments]);

  return (
    <>
      <div className="columns">
        <div className="column">
          <h1 className="title">Leagues</h1>
          <h2 className="subtitle">
            Create, join, or view your current leagues
          </h2>
        </div>
      </div>
      <div className="columns">
        <div className="column is-one-third">
          <LeagueCard isFirstLeague={true} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Leagues);
