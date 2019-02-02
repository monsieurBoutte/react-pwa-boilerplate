import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import SettingsIcon from '@material-ui/icons/Settings';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';

import { SettingsList } from './settings-list-component';

const useNavStyles = makeStyles({
  root: {
    flexGrow: 1
  },
  appBar: {
    position: 'sticky',
    width: '100%',
    zIndex: 2
  },
  settingsIcon: {
    color: '#fff'
  },
  settingsButton: {
    marginRight: -18
  },
  title: {
    fontSize: '1.125rem',
    color: '#fff',
    fontWeight: 800,
    flexGrow: 1
  }
});

export const NavBar = () => {
  const [settingsDrawer, setSettingsDrawer] = useState(false);
  const classes = useNavStyles();

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
