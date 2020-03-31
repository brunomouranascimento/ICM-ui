import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { PrivateRoute } from './components/core/private-route/PrivateRoute';

import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Dashboard from './pages/dashboard/Dashboard';

const Routes = () => (
  <Router>
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <PrivateRoute exact path="/" component={Dashboard} />
    </Switch>
  </Router>
);

export default Routes;
