import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { tournamentSelectors } from '../../redux/tournaments';

const LeagueCard = ({ isFirstLeague, league, owner, tournaments }) => (
  <div className="card">
    <div className="card-content">
      {league ? (
        <p className="subtitle has-text-weight-bold">
          {league.name} {owner ? '(Owner)' : ''}
        </p>
      ) : (
        <p className="has-text-weight-bold">
          {isFirstLeague
            ? `You don't have any current leagues`
            : 'Add a league'}
        </p>
      )}
      {league && <p className="has-text-weight-bold">Tournaments:</p>}
      <ul>
        {league &&
          league.tournaments.map(tournament => (
            <li key={tournament.id}>{tournaments[tournament].name}</li>
          ))}
      </ul>
    </div>
    <footer className="card-footer">
      {league ? (
        <div className="card-footer-item">
          <Link
            className="button is-link is-outlined"
            to={`/league/${league.id}`}
          >
            View League
          </Link>
        </div>
      ) : (
        <>
          <div className="card-footer-item">
            <Link className="button is-success" to="/league/new">
              Create League
            </Link>
          </div>
          <div className="card-footer-item">
            <button className="button is-link">Join League</button>
          </div>
        </>
      )}
    </footer>
  </div>
);

const mapStateToProps = state => ({
  tournaments: tournamentSelectors.getTournaments(state)
});

export default connect(mapStateToProps)(LeagueCard);
