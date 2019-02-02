import React from 'react';
import { Route, Router, Switch } from 'react-router';
import PrivateRoute from './PrivateRoute';
import { NavBar } from '../components/navbar-component';
import Home from '../pages/home-page';
import history from '../util/history-util';

export const Routes = () => (
  <Router history={history}>
    <Switch>
      <NavBar />
      <div style={{ paddingTop: '4rem' }} />
      <Route exact path="/" component={Home} />
      {/* <PrivateRoute path="/" component={() => RestrictedArea()} /> */}
    </Switch>
  </Router>
);

// if authenticated routes are needed, you can use this RestrictedArea
const RestrictedArea = () => {
  return (
    <Switch>
      {/* <PrivateRoute path="/something-private" component={SomethingPrivate} /> */}
    </Switch>
  );
};
