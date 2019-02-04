import React, { Fragment } from 'react';
import NavBar from '../components/navbar-component';
export const Layout = props => (
  <div>
    <NavBar />
    <div style={{ marginTop: '3rem' }}>{props.children}</div>
  </div>
);
