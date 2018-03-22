/***********************
 * Module Dependencies *
 ***********************/
const utils = require('./libraries/utils'),
  assets = require('./assets/default'),
  config = require(`./env/${utils.getEnvironment()}`); // eslint-disable-line import/no-dynamic-require


/******************
 * Module Members *
 ******************/
const controllerPaths = utils.getFilePaths(assets.controllers),
  modelPaths = utils.getFilePaths(assets.models),
  resolverPaths = utils.getFilePaths(assets.resolvers),
  routePaths = utils.getFilePaths(assets.routes),
  schemaPaths = utils.getFilePaths(assets.schemas);


/**
 * Prints API assets to console.
 */
function outputAssets() {
  utils.outputPaths(controllerPaths, 'Controllers');
  utils.outputPaths(modelPaths, 'Models');
  utils.outputPaths(resolverPaths, 'Resolvers');
  utils.outputPaths(routePaths, 'Routes');
  utils.outputPaths(schemaPaths, 'Schemas');
  console.log('\n'); // eslint-disable-line no-console
}

if (process.env.NODE_ENV === 'development') { outputAssets(); }

config.paths = {
  controllers: controllerPaths,
  models: modelPaths,
  resolvers: resolverPaths,
  routes: routePaths,
  schemas: schemaPaths
};
utils.deepFreeze(config);

module.exports = config;
