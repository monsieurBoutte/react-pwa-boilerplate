import React from 'react';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';

import { useThemeSelection } from '../hooks/theme-hooks';

const useHomePageStyles = ({ currentThemeSelection }) =>
  makeStyles({
    root: {
      paddingTop: '3rem',
      backgroundColor: `#${
        currentThemeSelection === 'lite' ? 'fff' : '3c3599'
      }`,
      height: '100vh'
    }
  });

const Home = () => {
  const { currentThemeSelection } = useThemeSelection();
  const classes = useHomePageStyles({ currentThemeSelection })();

  return (
    <div className={classes.root}>
      <h1>home</h1>
    </div>
  );
};

export default withRouter(Home);
