/***********************
 * Module Dependencies *
 ***********************/
const utils = require('../libraries/utils');


/******************
 * Module Members *
 ******************/
const assets = {
  controllers: 'app/controllers/**/*.js',
  models: 'app/models/**/*.js',
  resolvers: 'app/resolvers/**/*.js',
  routes: 'app/routes/**/*.js',
  schemas: 'app/schemas/**/*.js'
};
utils.deepFreeze(assets);


module.exports = assets;
