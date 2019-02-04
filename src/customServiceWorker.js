// See https://developers.google.com/web/tools/workbox/guides/configure-workbox
workbox.core.setLogLevel(workbox.core.LOG_LEVELS.debug);

workbox.core.setCacheNameDetails({
  prefix: 'git-lyrics',
  suffix: 'v2'
});

self.addEventListener('install', event => event.waitUntil(self.skipWaiting()));
self.addEventListener('activate', event =>
  event.waitUntil(self.clients.claim())
);

// We need this in Webpack plugin (refer to swSrc option): https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin#full_injectmanifest_config
workbox.precaching.precacheAndRoute(self.__precacheManifest);

// Set up staleWhileRevalidate strategy on javascript, css and any html files
// stale while revalidating link: https://developers.google.com/web/tools/workbox/modules/workbox-strategies
workbox.routing.registerRoute(
  /\.(?:js|css|html)$/,
  workbox.strategies.staleWhileRevalidate()
);

/***************************    💰 Caching Strategies 💰    ***************************/
// app-shell
workbox.routing.registerRoute('/', workbox.strategies.staleWhileRevalidate());

// favorites page
workbox.routing.registerRoute(
  '/favorites',
  workbox.strategies.staleWhileRevalidate()
);

/***************************    ⚔️ core api strategies ⚔️    ***************************/
workbox.routing.registerRoute(
  new RegExp('https://api.lyrics.ovh/v1/chevelle/closure}'),
  workbox.strategies.networkFirst(),
  'GET'
);
