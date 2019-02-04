import React, { useState } from 'react';
import { useStore } from 'easy-peasy';
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
import Badge from '@material-ui/core/Badge';

import { SettingsList } from './settings-list-component';
import { compose } from '../util/functional-util';
import history from '../util/history-util';

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
  const { favoriteLyrics } = useStore(state => state.music);
  const classes = useNavStyles();

  return (
    <div className={classes.root}>
      <AppBar position="absolute" className={classes.appBar}>
        <Toolbar>
          <div className={classes.title}>Git Lyrics</div>
          <IconButton
            className={classes.settingsButton}
            aria-label="Search"
            onClick={() => history.push('/')}
          >
            <SearchIcon className={classes.navIcon} />
          </IconButton>
          <IconButton
            className={classes.settingsButton}
            aria-label="Favorites"
            // onClick={() => setSettingsDrawer(true)}
          >
            {favoriteLyrics.length < 1 ? (
              <FavoriteBorderIcon className={classes.navIcon} />
            ) : (
              <Badge
                badgeContent={favoriteLyrics.length}
                color="secondary"
                // onClick={() => history.push('/shopping-cart')}
              >
                <FavoriteIcon
                  style={{ fontSize: '2.5rem' }}
                  className={classes.navIcon}
                />
              </Badge>
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
