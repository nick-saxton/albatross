import React from 'react';
import { connect } from 'react-redux';

import { leagueSelectors } from '../../redux/leagues';

const League = ({ league }) => (
  <>
    {league ? (
      <>
        <h1 className="title">{league.name}</h1>
        <div className="columns">
          <div className="column">
            <p>You do not currently have any entries in this league.</p>
          </div>
        </div>
        <button className="button">
          <span className="icon is-small">
            <i className="fa fa-plus"></i>
          </span>
          <span>New Entry</span>
        </button>
      </>
    ) : (
      <p>League not found</p>
    )}
  </>
);

const mapStateToProps = (state, ownProps) => ({
  league: leagueSelectors.getLeague(state, ownProps.match.params.id)
});

export default connect(mapStateToProps)(League);
