/* config-overrides.js */

const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const path = require('path');

module.exports = function override(config, env) {
  config.plugins = config.plugins.map(plugin => {
    if (plugin.constructor.name === 'GenerateSW') {
      return new WorkboxWebpackPlugin.InjectManifest({
        swSrc: path.join(__dirname, 'src', 'customServiceWorker.js'),
        swDest: path.join(__dirname, 'public', 'custom-service-worker.js')
      });
    }

    return plugin;
  });

  return config;
};
