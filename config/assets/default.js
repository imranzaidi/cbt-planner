/***********************
 * Module Dependencies *
 ***********************/
const utils = require('../libraries/utils');


/******************
 * Module Members *
 ******************/
const assets = {
  controllers: 'app/controllers/**/*.js',
  models: {
    mongoose: 'app/models/mongoose/**/*.js',
    sequelize: 'app/models/sequelize/**/*.js'
  },
  routes: 'app/routes/**/*.js'
};
utils.deepFreeze(assets);


module.exports = assets;
