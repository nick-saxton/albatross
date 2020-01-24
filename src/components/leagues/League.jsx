import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import { leagueOperations, leagueSelectors } from '../../redux/leagues';

const League = ({ fetchLeague, league }) => {
  const { id } = useParams();

  useEffect(() => {
    fetchLeague(id);
  }, [id]);

  return (
    <>
      {league ? (
        <>
          <h1 className="title">{league.name}</h1>
          <div className="columns">
            <div className="column">
              <p>You do not currently have any entries in this league.</p>
            </div>
          </div>
          <Link className="button" to={`/league/${id}/entry/new`}>
            <span className="icon is-small">
              <i className="fa fa-plus"></i>
            </span>
            <span>New Entry</span>
          </Link>
        </>
      ) : (
        <p>League not found</p>
      )}
    </>
  );
};

const mapStateToProps = (state, ownProps) => ({
  league: leagueSelectors.getLeague(state, ownProps.match.params.id)
});

const mapDispatchToProps = {
  fetchLeague: leagueOperations.fetchLeague
};

export default connect(mapStateToProps, mapDispatchToProps)(League);
