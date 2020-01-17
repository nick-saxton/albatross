import React from 'react';

const CenteredHero = ({ children }) => (
  <section
    className="hero is-fullheight-with-navbar"
    style={{ minHeight: 'calc(100vh - 9.25rem' }}
  >
    <div className="hero-body">
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-one-third">{children}</div>
        </div>
      </div>
    </div>
  </section>
);

export default CenteredHero;
