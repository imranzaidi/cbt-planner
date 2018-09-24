/***********************
 * Module Dependencies *
 ***********************/
const utils = require('../libraries/utils');


/******************
 * Module Members *
 ******************/
const assets = {
  models: 'app/models/**/*.js',
  resolvers: 'app/resolvers/**/*.js',
  schemas: 'app/schemas/**/*.js'
};
utils.deepFreeze(assets);


module.exports = assets;
