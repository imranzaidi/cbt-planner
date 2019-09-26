/***********************
 * Module Dependencies *
 ***********************/
const utils = require('./libraries/utils'),
  assets = require('./assets/default'),
  config = require(`./env/${utils.getEnvironment()}`); // eslint-disable-line import/no-dynamic-require


/******************
 * Module Members *
 ******************/
const modelPaths = utils.getFilePaths(assets.models, 'js'),
  resolverPaths = utils.getFilePaths(assets.resolvers, 'js'),
  schemaPaths = utils.getFilePaths(assets.schemas, 'graphql');


/**
 * Prints API assets to console.
 */
function outputAssets() {
  utils.outputPaths(modelPaths, 'Models');
  utils.outputPaths(resolverPaths, 'Resolvers');
  utils.outputPaths(schemaPaths, 'Schemas');
  console.log('\n'); // eslint-disable-line no-console
}

if (process.env.NODE_ENV === 'development' && process.env.OUTPUT_ASSETS) { outputAssets(); }

config.paths = {
  models: modelPaths,
  resolvers: resolverPaths,
  schemas: schemaPaths
};
utils.deepFreeze(config);

module.exports = config;
