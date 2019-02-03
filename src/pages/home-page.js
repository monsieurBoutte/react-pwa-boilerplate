import React from 'react';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';

import { useThemeSelection } from '../hooks/theme-hooks';

const useHomePageStyles = makeStyles({
  root: {
    paddingTop: '3rem',
    height: '100vh'
  }
});

const Home = () => {
  const { currentThemeSelection } = useThemeSelection();
  const classes = useHomePageStyles();

  return (
    <div
      className={classes.root}
      style={{
        backgroundColor: `#${
          currentThemeSelection === 'lite' ? 'cbcbcb' : '3c3599'
        }`
      }}
    >
      <h1>home</h1>
    </div>
  );
};

export default withRouter(Home);
