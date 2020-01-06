import React from 'react';
import { Link } from 'react-router-dom';

const LeagueCard = ({ id, isFirstLeague, league }) => (
  <div className="card">
    <div className="card-content">
      <p className="subtitle">
        {id
          ? league.name
          : isFirstLeague
          ? `You don't have any current leagues`
          : 'Add a league'}
      </p>
    </div>
    <footer className="card-footer">
      {id ? (
        <div className="card-footer-item">
          <button className="button is-link is-outlined">View League</button>
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

export default LeagueCard;
