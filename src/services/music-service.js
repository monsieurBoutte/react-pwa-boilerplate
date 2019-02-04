import axios from 'axios';
import { get } from 'lodash';
import { Observable } from 'rxjs';

import { cleanQueryParam } from '../util/functional-util';
import { request } from '../util/api-util';

// classic fetch
export const fetchLyrics = async payload => {
  const artist = get(payload, 'artist');
  const song = get(payload, 'song');
  // trim possible white space and replace space between with + signs
  const cleanArtist = cleanQueryParam(artist);
  const cleanSong = cleanQueryParam(song);
  try {
    const response = await request(
      'get',
      'https://api.lyrics.ovh/v1',
      `${cleanArtist}/${cleanSong}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};

// observable pattern that we can cancel midflight, should we need to
export const fetchLyrics$ = payload =>
  Observable.create(observer => {
    const artist = get(payload, 'artist');
    const song = get(payload, 'song');
    // trim possible white space and replace space between with + signs
    const cleanArtist = cleanQueryParam(artist);
    const cleanSong = cleanQueryParam(song);

    axios
      .get(`https://api.lyrics.ovh/v1/${cleanArtist}/${cleanSong}`)
      .then(response => {
        observer.next(response.data);
        observer.complete();
      })
      .catch(error => {
        observer.error(error);
      });
  });
