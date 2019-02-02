import React, { Fragment } from 'react';
import NavBar from '../components/navbar-component';

export const Layout = props => (
  <Fragment>
    <NavBar />
    {props.children}
  </Fragment>
);
