<h1 align="center"><strong>React PWA Boilerplate</strong></h1>

<p>The purpose of this repo is to get you up and running with a working sample progressive web app.</p>

> **note:** _This is an opinionated set up. However, you can easily replace things like the state management and ui library with anything of your choosing_

## Table of Contents

| Section                                                               | Description                                                                                                                             |
| :-------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------- |
| [**Project Structure**](#project-structure)                           | Directory structure of the project                                                                                                      |
| [**Service Worker**](#service-worker)                                 | Configuration of Service Worker using [**Work Box**](https://github.com/GoogleChrome/workbox)                                           |
| [**State Management Setup**](#state-managment-setup)                  | Redux configuration using [**Easy Peasy**](https://github.com/ctrlplusb/easy-peasy)                                                     |
| [**State Management DevTools**](#state-management-devtools)           | Redux devtools configuration                                                                                                            |
| [**UI Toolkit Abstraction**](ui-toolkit-abstraction)                  | Abstractions wrapping [**Material UI**](https://github.com/mui-org/material-ui) components                                              |
| [**Routing Setup**](#routing-setup)                                   | Configuration for routing and stubbed out Authenticated Routes                                                                          |
| [**In Flight Request Optimization**](#in-flight-request-optimization) | Abortable Network Request w/ [**RxJs**](https://github.com/ReactiveX/rxjs)                                                              |
| [**Netlify Config**](#netlify-config)                                 | Notes on config for [**Netlify**](https://www.netlify.com) to support [**react router**](https://github.com/ReactTraining/react-router) |
| [**iOS Support**](#ios-support)                                       | Notes on **iOS** and **Safari** support                                                                                                 |
| [**Additional Resources**](#additional-resources)                     | Resources used to build out this Repo                                                                                                   |

> **note:** _This project was initially bootstrapped with [Create React App](https://github.com/facebook/create-react-app)._

---

## Project Structure

```
react-pwa-boilerplate/
    ├── build/                          <-- final output destination for the entire app
    └── public/
        ├── _redirects                  <-- single page app routing for netlify
        └── manifest.json               <-- manifest for the pwa
    └── src/
        ├── components/
        ├── hooks/                      <-- custom hooks
        ├── models/                     <-- redux models
        ├── pages/                      <-- pages in the app that import components
        ├── routes/                     <-- index for all routes
        ├── util/                       <-- collection of utility functions
        ├── configureStore.js           <-- redux store configuration
        └── customServicerWorker.js     <-- where we define our caching strategies
    ├── config-overrides.js/            <-- build step config for workbox
    ├── netlify.toml/                   <-- single page app config for netlify
    └── package.json
```

---

## Service Worker

- **caching strategies**

  - pages are cached with a [stale while revalidating](https://developers.google.com/web/tools/workbox/modules/workbox-strategies) strategy
  - all javascript, css, and html is cached with a [stale while revalidating](https://developers.google.com/web/tools/workbox/modules/workbox-strategies) strategy
  - the manifest file is using a precache strategy
  - the core api is cached with a [network first](https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/#network-falling-back-to-cache) strategy

  - stale while revalidating caching strategy - diagram
    ![stalewhilerevalidating](https://user-images.githubusercontent.com/15992455/52191005-5ad4e400-2810-11e9-8a23-6fc07bebf406.png)

  - network frist caching strategy - diagram
    ![networkfirst](https://user-images.githubusercontent.com/15992455/52191021-848e0b00-2810-11e9-8505-5b0b58a539e2.png)

  - some additional strategies
    ![otherstrategies](https://user-images.githubusercontent.com/15992455/52192251-e8b3cd80-2816-11e9-8d06-32e824cd1de0.PNG)

  - refer to [**Work Box**](https://developers.google.com/web/tools/workbox/modules/workbox-strategies) for more strategies, as well as more thorough documentation.

---

- **build step configuration:**
  _this is already set up within the project in the `config-overrides` file._

```
// config-overrides.js
/* config-overrides.js */

const {
  rewireWorkboxInject,
  defaultInjectConfig
} = require('react-app-rewire-workbox');
const path = require('path');

module.exports = function override(config, env) {
  if (env === 'production') {
    console.log('Production build - Adding Workbox for PWAs');
    // Extend the default injection config with required swSrc
    const workboxConfig = {
      ...defaultInjectConfig,
      swSrc: path.join(__dirname, 'src', 'customServiceWorker.js'),
      importWorkboxFrom: 'local'
    };
    config = rewireWorkboxInject(workboxConfig)(config, env);
  }

  return config;
};
```

---

## State Management Setup

- the base configuration of the store is as follows:

```
// configureStore.js
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore } from 'easy-peasy';
import { model } from './models';

/**
 * model, is used for passing through the base model
 * the second argument takes an object for additional configuration
 */

const store = createStore(model, {
  compose: composeWithDevTools({ realtime: true, trace: true })
  // initialState: {}
});

export default store;
```

- _note: initialState is where you'd want to pass in the initial state of your auth model. So that if anyone refreshes the app, they don't get booted out of a private route_
- the base model being passed in:

```
// models/index.js
import { settingsModel } from './settings-model';
import { musicModel } from './music-model';

export const model = {
  ...settingsModel,
  ...musicModel
};
```

- sample model:

```
// models/settings-model.js
import {
  checkLocalStorage,
  setInLocalStorage
} from '../util/localstorage-util';

// reyhdrate state from localstorage if it exist
const initialState = {
  currentThemeSelection: checkLocalStorage('currentThemeSelection', 'lite')
};

export const settingsModel = {
  settings: {
    ...initialState,
    updateSelectedTheme: (state, payload) => {
      // update the state
      state.currentThemeSelection = payload;

      // store the current theme selection in localstorage
      setInLocalStorage('currentThemeSelection', payload);
    }
  }
};
```

- we can also bypass pulling in sagas or thunks by using [easy-peasy](https://github.com/ctrlplusb/easy-peasy)'s effect function
- sample effect:

```
// models/music-model.js
..code

export const musicModel = {
  music: {
    ...initialState,
    getLyrics: effect(async (dispatch, payload, getState) => {
      const { artist, song } = payload;
      dispatch.music.updateIsLyricsNotFound(false);
      dispatch.music.updateIsLyricsLoading(true);
      dispatch.music.updateCurrentArtist(artist);
      dispatch.music.updateCurrentSong(song);
      requestStream = fetchLyrics$(payload).subscribe({
        next: ({ lyrics }) => dispatch.music.updateCurrentLyrics(lyrics),
        error: data => dispatch.music.updateIsLyricsNotFound(true),
        complete: data => dispatch.music.updateIsLyricsLoading(false)
      });
    })
  }
}
```

---

## State Management DevTools

- **using tracing on actions within redux:**
  _this is already set up within project. All that's needed on your end is to adjust the configuration on your redux dev tools extension. As shown below_
  ![redux-trace-demo](https://user-images.githubusercontent.com/15992455/52167363-f0288900-26e7-11e9-8ec8-7ac35ab23572.gif)

---

## UI Toolkit Abstraction

- a common and bet practice approach for using UI toolkits is to wrap commonly used components so that you're never handcuffed to a specific ui library

- example:

```
// components/input-field-component.js
import React from 'react';
import TextField from '@material-ui/core/TextField';

export const InputField = ({
  input: { name, value, onChange, ...restInput },
  extraInputProps = {},
  meta,
  ...rest
}) => (
  <TextField
    {...rest}
    helperText={meta.touched ? meta.error : undefined}
    error={meta.error && meta.touched}
    onChange={onChange}
    value={value}
    name={name}
    InputProps={{
      ...restInput,
      ...extraInputProps
    }}
  />
);
```

- we're also using [react final form](https://github.com/final-form/react-final-form), so we're passing in additional props to this abstraction, as well as any other properties captured in `..rest`

---

## Routing Setup

- base index file:

```
// routes/index.js
import React from 'react';
import { Route, Router, Switch } from 'react-router';

import { Layout } from '../components/layout-component';
import { Favorites } from '../pages/favorites-page';
import history from '../util/history-util';
import Home from '../pages/home-page';

/**
 * 👉 if authenticated routes are needed 👈
 *
 * import PrivateRoute from './PrivateRoute';
 *
 * const RestrictedArea = () => {
 * return (
 *  <Switch>
 *    <PrivateRoute path="/something-private" component={SomethingPrivate} />
 *  </Switch>
 * );
 *};
 **/

export const Routes = () => (
  <Router history={history}>
    <Layout>
      <Switch>
        <Route path="/favorites" component={Favorites} />
        <Route exact path="/" component={Home} />
        {/* <PrivateRoute path="/" component={() => RestrictedArea()} /> */}
      </Switch>
    </Layout>
  </Router>
);
```

- if authenticated routes are needed:

```
// routes/PrivateRoute.js
import React from 'react';
import { Redirect, Route, withRouter } from 'react-router-dom';
import get from 'lodash/get';
import { useAuth } from '../hooks/auth-hook';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { auth, cachedAuth } = useAuth();
  const authPresent = !!get(auth, 'token', false);
  const cachedAuthExist = !!get(cachedAuth, 'token', false);
  return (
    <Route
      {...rest}
      render={props =>
        authPresent || cachedAuthExist ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default withRouter(PrivateRoute);
```

- this will check to see if the user has a token or not and redirect properly

---

## In Flight Request Optimization

- with an observable pattern, we can cancel a flight mid request by unsubscribing from it

```
// services/music-service.js
..code
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

// models/music-model -----------------------------------------------/
..code

let requestStream;

requestStream = fetchLyrics$(payload).subscribe({
 next: ({ lyrics }) => dispatch.music.updateCurrentLyrics(lyrics),
 error: data => dispatch.music.updateIsLyricsNotFound(true),
 complete: data => dispatch.music.updateIsLyricsLoading(false)
});

..more code

cancelLyricSearch: effect(async (dispatch, payload, getState) => {
 requestStream.unsubscribe();
 dispatch.music.updateIsLyricsLoading(false);
}),

// pages/home-page -------------------------------------------------/
..code

onClick={() => {
 form.reset();
 if (isLyricsNotFound) updateIsLyricsNotFound(false);
 if (isLyricsLoading) cancelLyricSearch();
}}
```

- while this a very rudimentary example, this can be really powerful with search bars. Being able to cancel network request mid flight saves precious cpu cycles and other overhead fluff invovled with resolving request

---

## Netlify Config

- `netlify.toml` in the root of the app

```
[build]
  command = "yarn build"
  publish = "build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

- `_redirects` in the public directory

```
/*    /index.html   200
```

---

## iOS Support

- iPhone status bar currently only supports white, black, and translucent
- all sizes of your app's icons must be declared within the `index.html` and present within your public directory
  ![appleicons](https://user-images.githubusercontent.com/15992455/52210604-9514a480-2855-11e9-99b3-03ceb062e0ea.png)
- the same is true for splash screens.
- push notifications are still not supported ¯\_(ツ)\_/¯
- if the user has a ton of apps running on their iphone, safari may arbitrarily clear out your cache and terminate your service worker..

---

## Additional Resources

- [Create a react app pwa notes](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)
- [Service workers](https://jeffy.info/2018/10/10/sw-in-c-r-a.html)
- [Workbox caching Strategies](https://developers.google.com/web/tools/workbox/modules/workbox-strategies)
- [Lyric search api](https://lyricsovh.docs.apiary.io/#reference/0/lyrics-of-a-song/search)
- [Handling check for updated service worker](https://link.medium.com/4w1nhv6NNT)
- [Material UI theme generator](https://cimdalli.github.io/mui-theme-generator/)
- [Background fetch strategy explained](https://www.youtube.com/watch?v=cElAoxhQz6w)
- [Background fetch strategy documentation](https://developers.google.com/web/updates/2018/12/background-fetch)
- [Preload Components that kickoff network request on mount w/ react.lazy](https://hackernoon.com/lazy-loading-and-preloading-components-in-react-16-6-804de091c82d)
- [PWA's are now supported within Google's Play Store!!!](https://medium.com/@firt/google-play-store-now-open-for-progressive-web-apps-ec6f3c6ff3cc)
- [Handling Network Request w/ RxJs](https://itnext.io/working-with-axios-and-rxjs-to-make-simple-ajax-service-module-6fda9ecdaf9f)
- [Tips for imroving your PWA iOS user's experience](https://www.netguru.com/codestories/few-tips-that-will-make-your-pwa-on-ios-feel-like-native)
