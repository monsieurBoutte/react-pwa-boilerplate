import React from 'react';
import { Redirect, Route, withRouter } from 'react-router-dom';
import get from 'lodash/get';
import { useAuth } from '../hooks/auth-hook';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { auth, cachedAuth } = useAuth();
  const authPresent = !!get(auth, 'token', false);
  const cachedAuthExist = !!get(cachedAuth, 'token', false);
  return (
    <Route
      {...rest}
      render={props =>
        authPresent || cachedAuthExist ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default withRouter(PrivateRoute);
