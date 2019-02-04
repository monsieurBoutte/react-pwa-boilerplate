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
      swDest: path.join(__dirname, 'public', 'custom-service-worker.js'),
      importWorkboxFrom: 'local'
    };
    config = rewireWorkboxInject(workboxConfig)(config, env);
  }

  return config;
};

// module.exports = function override(config, env) {
//   config.plugins = config.plugins.map(plugin => {
//     if (plugin.constructor.name === 'GenerateSW') {
//       return new WorkboxWebpackPlugin.InjectManifest({
//         swSrc: path.join(__dirname, 'src', 'customServiceWorker.js'),
//         swDest: path.join(__dirname, 'public', 'custom-service-worker.js')
//       });
//     }

//     return plugin;
//   });

//   return config;
// };
