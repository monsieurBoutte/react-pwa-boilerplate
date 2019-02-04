import React from 'react';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { makeStyles } from '@material-ui/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItem from '@material-ui/core/ListItem';
import Switch from '@material-ui/core/Switch';
import List from '@material-ui/core/List';
import Icon from '@material-ui/core/Icon';
import { useThemeSelection } from '../hooks/theme-hook';

const useSettingsStyles = makeStyles({
  root: {
    height: '100vh',
    marginTop: '3.5rem',
    width: 250
  }
});

export const SettingsList = () => {
  const { currentThemeSelection, handleThemeToggle } = useThemeSelection();
  const { root } = useSettingsStyles();

  return (
    <div
      className={root}
      style={{
        backgroundColor: `#${
          currentThemeSelection === 'lite' ? 'cbcbcb' : '3c3599'
        }`
      }}
    >
      <List
        subheader={
          <ListSubheader
            style={{
              color: `#${currentThemeSelection === 'lite' ? '5b5b5b' : 'fff'}`,
              fontWeight: 700
            }}
          >
            Settings
          </ListSubheader>
        }
      >
        <ListItem>
          <ListItemIcon>
            <Icon
              style={{
                color: `#${currentThemeSelection === 'lite' ? '5b5b5b' : 'fff'}`
              }}
            >
              {currentThemeSelection === 'lite'
                ? 'brightness_5'
                : 'brightness_4'}
            </Icon>
          </ListItemIcon>
          <div
            style={{
              color: `#${currentThemeSelection === 'lite' ? '5b5b5b' : 'fff'}`,
              fontWeight: 700
            }}
          >
            Theme
          </div>
          <ListItemSecondaryAction>
            <Switch
              onChange={() => handleThemeToggle()}
              checked={currentThemeSelection === 'dark'}
            />
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </div>
  );
};
