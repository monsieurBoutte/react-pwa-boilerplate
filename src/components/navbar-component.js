import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { withTheme } from '@material-ui/core/styles';
import SettingsIcon from '@material-ui/icons/Settings';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';

import { SettingsList } from './settings-list-component';
import { useThemeSelection } from '../hooks/theme-hooks';

const useNavStyles = ({ currentThemeSelection }) =>
  makeStyles({
    root: {
      flexGrow: 1
    },
    appBar: {
      position: 'sticky',
      backgroundColor: `#${
        currentThemeSelection === 'dark' ? 'fff' : '3c3599'
      } !important`,
      width: '100%',
      zIndex: 2
    },
    settingsIcon: {
      color: `#${currentThemeSelection === 'lite' ? 'fff' : '3c3599'}`
    },
    settingsButton: {
      marginRight: -18
    },
    title: {
      fontSize: '1.125rem',
      color: `#${currentThemeSelection === 'lite' ? 'fff' : '3c3599'}`,
      fontWeight: 800,
      flexGrow: 1
    }
  });

const NavBar = () => {
  const [settingsDrawer, setSettingsDrawer] = useState(false);
  const { currentThemeSelection } = useThemeSelection();
  const classes = useNavStyles({ currentThemeSelection })();

  return (
    <div className={classes.root}>
      <AppBar position="absolute" className={classes.appBar}>
        <Toolbar>
          <div className={classes.title}>Git Employed</div>
          <IconButton
            className={classes.settingsButton}
            aria-label="Settings"
            onClick={() => setSettingsDrawer(true)}
          >
            <SettingsIcon className={classes.settingsIcon} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        style={{ position: 'relative', zIndex: 1 }}
        anchor="right"
        open={settingsDrawer}
        onClose={() => setSettingsDrawer(false)}
      >
        <div tabIndex={0} role="button" style={{ outline: 'none' }}>
          <SettingsList />
        </div>
      </Drawer>
    </div>
  );
};

export default withTheme()(NavBar);
