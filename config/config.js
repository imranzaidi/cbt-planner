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
 * Helper for printing all configuration info to console.
 */
function outputConfigInfo() {
  utils.outputPaths(modelPaths, 'Models');
  utils.outputPaths(controllerPaths, 'Controllers');
  utils.outputPaths(routePaths, 'Routes');
  console.log('\n');
}


outputConfigInfo();
config.paths = {
  models: modelPaths,
  controllers: controllerPaths,
  routes: routePaths
};
utils.deepFreeze(config);


module.exports = config;
