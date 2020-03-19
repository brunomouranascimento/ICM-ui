import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// import { PrivateRoute } from './components/core/private-route/PrivateRoute';

import Login from './pages/Login';

const Routes = () => (
  <Router>
    <Switch>
      <Route path="/login" component={Login} />
    </Switch>
  </Router>
);

export default Routes;
