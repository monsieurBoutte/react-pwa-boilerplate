import React, { useState } from 'react';
import { useStore, useAction } from 'easy-peasy';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { makeStyles } from '@material-ui/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItem from '@material-ui/core/ListItem';
import Switch from '@material-ui/core/Switch';
import List from '@material-ui/core/List';
import Icon from '@material-ui/core/Icon';

const useSettingsStyles = makeStyles({
  root: {
    marginTop: 60,
    width: 250
  }
});

export const SettingsList = () => {
  const { currentThemeSelection } = useStore(state => state.settings);
  const { root } = useSettingsStyles();
  const { updateSelectedTheme } = useAction(dispatch => ({
    updateSelectedTheme: dispatch.settings.updateSelectedTheme
  }));

  const handleToggle = () =>
    currentThemeSelection === 'lite'
      ? updateSelectedTheme('dark')
      : updateSelectedTheme('lite');

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
            <ListItemText primary="Theme" />
            <ListItemSecondaryAction>
              <Switch
                onChange={() => handleToggle()}
                checked={currentThemeSelection === 'dark'}
              />
            </ListItemSecondaryAction>
          </ListItemIcon>
        </ListItem>
      </List>
    </div>
  );
};
