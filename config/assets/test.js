/***********************
 * Module Dependencies *
 ***********************/
const utils = require('../libraries/utils');


/******************
 * Module Members *
 ******************/
const assets = {
  controllers: 'test/controllers/**/*.js',
  models: 'test/models/**/*.js',
  libraries: 'test/libraries/**/*.js'
};
utils.deepFreeze(assets);


module.exports = assets;
