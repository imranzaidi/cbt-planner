/***********************
 * Module Dependencies *
 ***********************/
const utils = require('../libraries/utils');


/******************
 * Module Members *
 ******************/
const developmentConfig = {
  app: {
    port: 3000,
    env: 'development'
  },

  db: {
    host: 'localhost',
    name: 'cbt-planner',
    port: '27017'
  }
};


utils.deepFreeze(developmentConfig);


module.exports = developmentConfig;
