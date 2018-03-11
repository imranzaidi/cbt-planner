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
  routes: 'app/routes/**/*.js'
};
utils.deepFreeze(assets);


module.exports = assets;
