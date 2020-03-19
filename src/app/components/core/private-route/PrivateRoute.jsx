import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { isAuthenticated } from '../../../authentication/authService';

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    render={props =>
      isAuthenticated() ? (
        <Component {...rest} />
      ) : (
        <Redirect
          to={{ pathname: '/login', state: { from: props.location } }}
        />
      )
    }
  />
);
