import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { authSelectors } from '../../redux/auth';
import { leagueSelectors, leagueOperations } from '../../redux/leagues';
import {
  tournamentOperations,
  tournamentSelectors
} from '../../redux/tournaments';

import LeagueCard from './LeagueCard';

const Leagues = ({
  fetchLeagues,
  fetchTournaments,
  leagues,
  tournaments,
  user
}) => {
  useEffect(() => {
    // Only get the tournaments once since they should never change
    if (Object.keys(tournaments).length === 0) {
      fetchTournaments();
    }

    fetchLeagues();
  }, [fetchLeagues, fetchTournaments, leagues, tournaments]);

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
      <div className="columns is-multiline">
        {Object.values(leagues).map(league => (
          <div className="column is-one-third" key={league.id}>
            <LeagueCard league={league} owner={league.owner === user.uid} />
          </div>
        ))}
        <div className="column is-one-third">
          <LeagueCard isFirstLeague={Object.keys(leagues).length === 0} />
        </div>
      </div>
    </>
  );
};

const mapStateToProps = state => ({
  leagues: leagueSelectors.getLeagues(state),
  tournaments: tournamentSelectors.getTournaments(state),
  user: authSelectors.getUser(state)
});

const mapDispatchToProps = {
  fetchLeagues: leagueOperations.fetchLeagues,
  fetchTournaments: tournamentOperations.fetchTournaments
};

export default connect(mapStateToProps, mapDispatchToProps)(Leagues);
