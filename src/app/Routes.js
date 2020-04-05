import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { PrivateRoute } from './components/core/private-route/PrivateRoute';

import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import ForgotPassword from './pages/forgot-password/ForgotPassword';
import ResetPassword from './pages/reset-password/ResetPassword';
import Dashboard from './pages/dashboard/Dashboard';

const Routes = () => (
  <Router>
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/forgot-password" component={ForgotPassword} />
      <Route path="/reset-password/:token" component={ResetPassword} />
      <PrivateRoute exact path="/" component={Dashboard} />
    </Switch>
  </Router>
);

export default Routes;
