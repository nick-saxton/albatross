import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import CreateLeague from './leagues/CreateLeague';
import League from './leagues/League';
import Leagues from './leagues/Leagues';
import LogIn from './auth/LogIn';
import Navbar from './Navbar';
import ProtectedRoute from './ProtectedRoute';
import SignUp from './auth/SignUp';

const App = () => (
  <Router>
    <Navbar />
    <section className="section">
      <div className="container">
        <Switch>
          <ProtectedRoute component={CreateLeague} path="/league/new" />
          <ProtectedRoute component={League} path="/league/:id" />
          <ProtectedRoute component={Leagues} exact path="/" />
          <Route component={LogIn} path="/login" />
          <Route component={SignUp} path="/signup" />
        </Switch>
      </div>
    </section>
  </Router>
);

export default App;
