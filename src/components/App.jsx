import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import CreateLeague from './leagues/CreateLeague';
import Leagues from './leagues/Leagues';
import LogIn from './auth/LogIn';
import Navbar from './Navbar';
import ProtectedRoute from './ProtectedRoute';
import SignUp from './auth/SignUp';

const App = () => (
  <Router>
    <Navbar />
    <div className="container">
      <Switch>
        <ProtectedRoute component={CreateLeague} path="/league/new" />
        <ProtectedRoute component={Leagues} exact path="/" />
        <Route component={LogIn} path="/login" />
        <Route component={SignUp} path="/signup" />
      </Switch>
    </div>
  </Router>
);

export default App;
