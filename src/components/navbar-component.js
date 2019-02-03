import React, { useState } from 'react';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import { withTheme } from '@material-ui/core/styles';
import SettingsIcon from '@material-ui/icons/Settings';
import FavoriteIcon from '@material-ui/icons/Favorite';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';

import { SettingsList } from './settings-list-component';
import { compose } from '../util/functional-util';

const useNavStyles = makeStyles({
  root: {
    flexGrow: 1
  },
  appBar: {
    position: 'sticky',
    backgroundColor: '#fff !important',
    width: '100%',
    zIndex: 2
  },
  navIcon: {
    color: '#3c3599'
  },
  settingsButton: {
    marginRight: -18
  },
  title: {
    fontSize: '1.125rem',
    color: '#3c3599',
    fontWeight: 800,
    flexGrow: 1
  }
});

const NavBar = () => {
  const [settingsDrawer, setSettingsDrawer] = useState(false);
  const classes = useNavStyles();

  //todo: implement favorites model
  const favoriteJobs = [];

  return (
    <div className={classes.root}>
      <AppBar position="absolute" className={classes.appBar}>
        <Toolbar>
          <div className={classes.title}>Git Employed</div>
          <IconButton
            className={classes.settingsButton}
            aria-label="Search"
            // onClick={() => setSettingsDrawer(true)}
          >
            <SearchIcon className={classes.navIcon} />
          </IconButton>
          <IconButton
            className={classes.settingsButton}
            aria-label="Favorites"
            // onClick={() => setSettingsDrawer(true)}
          >
            {favoriteJobs.length < 1 ? (
              <FavoriteBorderIcon className={classes.navIcon} />
            ) : (
              <FavoriteIcon className={classes.navIcon} />
            )}
          </IconButton>
          <IconButton
            className={classes.settingsButton}
            aria-label="Settings"
            onClick={() => setSettingsDrawer(true)}
          >
            <SettingsIcon className={classes.navIcon} />
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

export default compose(
  withTheme(),
  withRouter
)(NavBar);
