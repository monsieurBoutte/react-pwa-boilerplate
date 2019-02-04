import React from 'react';
import { useStore, useAction } from 'easy-peasy';
import { Form, Field } from 'react-final-form';
import { withRouter } from 'react-router-dom';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';

import { InputField } from '../components/input-field-component';
import { Lyrics } from '../components/lyrics-component';
import { useThemeSelection } from '../hooks/theme-hooks';
import { useBtnStyles } from '../styles/button-styles';
import { useCardStyles } from '../styles/card-styles';

const Home = () => {
  const { isLyricsLoading, isLyricsNotFound, lyrics } = useStore(
    state => state.music
  );
  const { getLyrics, cancelLyricSearch, updateIsLyricsNotFound } = useAction(
    dispatch => ({
      updateIsLyricsNotFound: dispatch.music.updateIsLyricsNotFound,
      cancelLyricSearch: dispatch.music.cancelLyricSearch,
      getLyrics: dispatch.music.getLyrics
    })
  );

  const { currentThemeSelection } = useThemeSelection();
  const { baseCard, title } = useCardStyles();
  const { btnGroup } = useBtnStyles();

  const searchValidation = values => {
    let errors = {};
    if (!values.artist) {
      errors.artist = 'Required';
    }
    if (!values.song) {
      errors.song = 'Required';
    }
    return errors;
  };

  const handleLyricSearch = values => getLyrics(values);

  return (
    <div
      style={{
        backgroundColor: `#${
          currentThemeSelection === 'lite' ? 'cbcbcb' : '3c3599'
        }`,
        height: lyrics ? undefined : '100vh',
        padding: '2rem'
      }}
    >
      <Card className={baseCard}>
        <CardContent>
          <h2 className={title}>
            Fetch{' '}
            <span role="img" aria-label="head phones">
              🎧
            </span>{' '}
            Lyrics
          </h2>
          <Form
            onSubmit={handleLyricSearch}
            validate={searchValidation}
            render={({
              hasValidationErrors,
              handleSubmit,
              submitting,
              pristine,
              values,
              active,
              dirty,
              reset,
              form
            }) => (
              <form onSubmit={handleSubmit}>
                <Field
                  data-testid="artist-name-input-field"
                  id="artist-name-input-field"
                  component={InputField}
                  placeholder="Chevelle"
                  variant="outlined"
                  margin="normal"
                  label="Artist"
                  name="artist"
                  type="text"
                  fullWidth
                />
                <Field
                  data-testid="song-input-field"
                  id="song-input-field"
                  component={InputField}
                  placeholder="Closure"
                  variant="outlined"
                  margin="normal"
                  label="Song"
                  type="text"
                  name="song"
                  fullWidth
                />
                <hr style={{ color: '#3c359966' }} />
                <div className={btnGroup}>
                  <div>
                    <Button
                      data-testid="clear-job-search-button"
                      style={{ marginRight: '.5rem' }}
                      onClick={() => {
                        form.reset();
                        if (isLyricsNotFound) updateIsLyricsNotFound(false);
                        if (isLyricsLoading) cancelLyricSearch();
                      }}
                      disabled={pristine}
                      variant="outlined"
                      color="secondary"
                      size="medium"
                    >
                      {isLyricsLoading ? 'Cancel' : 'Clear'}
                    </Button>
                  </div>
                  <div>
                    <Button
                      disabled={hasValidationErrors || submitting}
                      data-testid="submit-job-search-button"
                      style={{ marginLeft: '.5rem' }}
                      variant="contained"
                      color="primary"
                      size="medium"
                      type="submit"
                    >
                      Search
                    </Button>
                  </div>
                </div>
              </form>
            )}
          />
        </CardContent>
      </Card>
      <br />
      {lyrics && <Lyrics />}
      {isLyricsNotFound && (
        <Card className={baseCard}>
          <CardContent>
            <div style={{ padding: '1rem', paddingTop: '0' }}>
              <p
                style={{
                  textAlign: 'center',
                  fontSize: 'x-large',
                  fontWeight: 'bold'
                }}
              >
                lyrics not found ¯\_(ツ)_/¯
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default withRouter(Home);
