import React, { useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import { authSelectors } from '../../redux/auth';
import { entryOperations, entrySelectors } from '../../redux/entries';
import { leagueOperations, leagueSelectors } from '../../redux/leagues';

const League = ({ entries, fetchEntries, fetchLeague, league, user }) => {
  const { id } = useParams();

  useEffect(() => {
    fetchEntries(id);
    fetchLeague(id);
  }, [fetchEntries, fetchLeague, id]);

  const currentUserEntries = useMemo(() => {
    return Object.values(entries)
      .filter(entry => {
        return entry.owner === user.uid;
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [entries, user]);

  return (
    <>
      {league ? (
        <>
          <h1 className="title">{league.name}</h1>
          {currentUserEntries.length > 0 ? (
            <>
              <div className="columns">
                <div className="column">
                  <h2 className="title is-5">Your Entries</h2>
                </div>
              </div>
              <div className="columns">
                <div className="column is-one-third">
                  <table className="table is-fullwidth">
                    <tbody>
                      {currentUserEntries.map(entry => (
                        <tr key={entry.id}>
                          <td>{entry.name}</td>
                          <td className="has-text-right">
                            <Link
                              className="button is-link is-small"
                              to={`/league/${id}/entry/${entry.id}`}
                            >
                              Modify
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          ) : (
            <div className="columns">
              <div className="column">
                <p>You do not currently have any entries in this league.</p>
              </div>
            </div>
          )}

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
  entries: entrySelectors.getEntries(state),
  league: leagueSelectors.getLeague(state, ownProps.match.params.id),
  user: authSelectors.getUser(state)
});

const mapDispatchToProps = {
  fetchEntries: entryOperations.getEntries,
  fetchLeague: leagueOperations.fetchLeague
};

export default connect(mapStateToProps, mapDispatchToProps)(League);
