import React, { useEffect } from 'react';
import { useStore, useAction } from 'easy-peasy';
import CardContent from '@material-ui/core/CardContent';
import Icon from '@material-ui/core/Icon';
import Card from '@material-ui/core/Card';

import { useThemeSelection } from '../hooks/theme-hook';
import { useCardStyles } from '../styles/card-styles';
import history from '../util/history-util';

export const Favorites = () => {
  const { favoriteLyrics } = useStore(state => state.music);
  const { toggleVisibility, nixFromList } = useAction(dispatch => ({
    toggleVisibility: dispatch.music.toggleVisibility,
    nixFromList: dispatch.music.nixFromList
  }));

  useEffect(() => {
    // if the user has nuked their collection
    // redirect them back to the home page
    if (favoriteLyrics.length === 0) history.push('/');
  });

  const { currentThemeSelection } = useThemeSelection();
  const { baseCard } = useCardStyles();
  return (
    <div
      style={{
        backgroundColor: `#${
          currentThemeSelection === 'lite' ? 'cbcbcb' : '3c3599'
        }`,
        minHeight: '100vh',
        padding: '2rem'
      }}
    >
      <h1
        style={{
          textAlign: 'center',
          color: `#${currentThemeSelection === 'lite' ? '3C3599' : 'F50057'}`
        }}
      >
        Favorite{' '}
        <span role="img" aria-label="horns">
          🤘
        </span>{' '}
        Lyrics
      </h1>
      {favoriteLyrics.map((element, index) => (
        <Card
          key={`${element.artist}-${index}`}
          style={{ marginTop: '1rem' }}
          className={baseCard}
        >
          <CardContent>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ fontWeight: 600, color: '#3C3599' }}>
                "{element.song.toLowerCase()}" by {element.artist.toLowerCase()}
              </div>
            </div>
            <hr style={{ color: '#3c359966' }} />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Icon
                onClick={() => nixFromList({ index })}
                style={{ cursor: 'pointer', marginRight: '4rem' }}
                color="primary"
              >
                delete_forever
              </Icon>
              <Icon
                onClick={() =>
                  toggleVisibility({ index, visible: !element.lyricsExpanded })
                }
                style={{ cursor: 'pointer' }}
                color="primary"
              >
                {element.lyricsExpanded ? 'arrow_drop_up' : 'arrow_drop_down'}
              </Icon>
            </div>
            {element.lyricsExpanded && <p>{element.lyrics}</p>}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
