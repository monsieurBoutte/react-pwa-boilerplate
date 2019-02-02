import React from 'react';
import { Route, Router, Switch } from 'react-router';

import { Layout } from '../components/layout-component';
import history from '../util/history-util';
import Home from '../pages/home-page';

/**
 * 👉 if authenticated routes are needed 👈
 *
 * import PrivateRoute from './PrivateRoute';
 *
 * const RestrictedArea = () => {
 * return (
 *  <Switch>
 *    <PrivateRoute path="/something-private" component={SomethingPrivate} />
 *  </Switch>
 * );
 *};
 **/

export const Routes = () => (
  <Router history={history}>
    <Layout>
      <Switch>
        <Route exact path="/" component={Home} />
        {/* <PrivateRoute path="/" component={() => RestrictedArea()} /> */}
      </Switch>
    </Layout>
  </Router>
);
