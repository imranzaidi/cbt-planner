/***********************
 * Module Dependencies *
 ***********************/
const utils = require('./libraries/utils'),
  assets = require('./assets/default'),
  config = require(`./env/${utils.getEnvironment()}`); // eslint-disable-line import/no-dynamic-require


/******************
 * Module Members *
 ******************/
const modelPaths = utils.getFilePaths(assets.models),
  controllerPaths = utils.getFilePaths(assets.controllers),
  routePaths = utils.getFilePaths(assets.routes);


/**
 * Prints API assets to console.
 */
function outputAssets() {
  utils.outputPaths(modelPaths, 'Models');
  utils.outputPaths(controllerPaths, 'Controllers');
  utils.outputPaths(routePaths, 'Routes');
  console.log('\n'); // eslint-disable-line no-console
}

if (process.env.NODE_ENV === 'development') { outputAssets(); }

config.paths = {
  models: modelPaths,
  controllers: controllerPaths,
  routes: routePaths
};
utils.deepFreeze(config);

module.exports = config;
