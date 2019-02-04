import React from 'react';
import { useStore, useAction } from 'easy-peasy';
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Card from '@material-ui/core/Card';

import { useBtnStyles } from '../styles/button-styles';
import { useCardStyles } from '../styles/card-styles';

export const Lyrics = () => {
  const { artist, song, lyrics } = useStore(state => state.music);
  const { addToFavoriteLyrics, updateCurrentLyrics } = useAction(dispatch => ({
    addToFavoriteLyrics: dispatch.music.addToFavoriteLyrics,
    updateCurrentLyrics: dispatch.music.updateCurrentLyrics
  }));
  const { baseCard, title } = useCardStyles();
  const { btnGroup } = useBtnStyles();
  return (
    <Card style={{ marginTop: '1rem' }} className={baseCard}>
      <h2 className={title}>Lyrics</h2>
      <div style={{ padding: '1rem', paddingTop: '0' }}>
        <p>{lyrics}</p>
        <hr style={{ color: '#3c359966' }} />
      </div>
      <div className={btnGroup} style={{ paddingBottom: '1rem' }}>
        <IconButton>
          <Icon onClick={() => updateCurrentLyrics('')} color="primary">
            thumb_down
          </Icon>
        </IconButton>
        <IconButton>
          <FavoriteIcon
            onClick={() =>
              addToFavoriteLyrics({
                artist,
                song,
                lyrics,
                lyricsExpanded: false
              })
            }
            color="secondary"
          />
        </IconButton>
      </div>
    </Card>
  );
};
