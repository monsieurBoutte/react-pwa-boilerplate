import React from 'react';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { makeStyles } from '@material-ui/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItem from '@material-ui/core/ListItem';
import Switch from '@material-ui/core/Switch';
import List from '@material-ui/core/List';
import Icon from '@material-ui/core/Icon';

import { useThemeSelection } from '../hooks/theme-hooks';

const useSettingsStyles = makeStyles({
  root: {
    marginTop: 60,
    width: 250
  }
});

export const SettingsList = () => {
  const { currentThemeSelection, handleThemeToggle } = useThemeSelection();
  const { root } = useSettingsStyles();

  return (
    <div className={root}>
      <List subheader={<ListSubheader>Settings</ListSubheader>}>
        <ListItem>
          <ListItemIcon>
            <Icon>
              {currentThemeSelection === 'lite'
                ? 'brightness_5'
                : 'brightness_4'}
            </Icon>
          </ListItemIcon>
          <ListItemText primary="Theme" />
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
