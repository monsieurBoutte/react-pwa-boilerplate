import React from 'react';
import { Route, Router, Switch } from 'react-router';
import history from '../util/history-util';
import PrivateRoute from './PrivateRoute';
import NavBar from '../components/navbar-component';

// if authenticated routes are needed, you can use this RestrictedArea
const RestrictedArea = () => {
  return (
    <Switch>
      {/* <PrivateRoute path="/something-private" component={SomethingPrivate} /> */}
      {/* <PrivateRoute path="/admin-profile" component={AdminProfile} /> */}
    </Switch>
  );
};

// todo: implement Home component
// todo: implement NavBar component

export const Routes = () => (
  <Router history={history}>
    <NavBar />
    <div className="pt-16" />
    <Switch>
      {/* <Route exact path="/" component={Home} /> */}
      {/* <PrivateRoute path="/" component={() => RestrictedArea()} /> */}
    </Switch>
  </Router>
);
