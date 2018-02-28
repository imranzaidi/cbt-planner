/***********************
 * Module Dependencies *
 ***********************/
const utils = require('./libraries/utils'),
  assets = require('./assets/default'),
  config = require(`./env/${utils.getEnvironment()}`); // eslint-disable-line import/no-dynamic-require


/******************
 * Module Members *
 ******************/
const mongooseModelPaths = utils.getFilePaths(assets.models.mongoose),
  controllerPaths = utils.getFilePaths(assets.controllers),
  routePaths = utils.getFilePaths(assets.routes),
  sequelizeModelPaths = utils.getFilePaths(assets.models.sequelize);


/**
 * Prints API assets to console.
 */
function outputAssets() {
  utils.outputPaths(controllerPaths, 'Controllers');
  utils.outputPaths(mongooseModelPaths, 'Models (Mongoose)');
  utils.outputPaths(sequelizeModelPaths, 'Models (Sequelize)');
  utils.outputPaths(routePaths, 'Routes');
  console.log('\n'); // eslint-disable-line no-console
}

if (process.env.NODE_ENV === 'development') { outputAssets(); }

config.paths = {
  models: {
    mongoose: mongooseModelPaths,
    sequelize: sequelizeModelPaths
  },
  controllers: controllerPaths,
  routes: routePaths
};
utils.deepFreeze(config);

module.exports = config;
