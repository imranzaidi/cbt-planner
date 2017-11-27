/***********************
 * Module Dependencies *
 ***********************/
const express = require('./config/libraries/express'),
  mongooseService = require('./config/libraries/mongoose'),
  config = require('./config/config');


/******************
 * Module Members *
 ******************/
let app;


mongooseService.connect(config.db, (db, error) => { // eslint-disable-line no-unused-vars
  mongooseService.loadModels(config.paths.models);
  app = express.initialize(config);
  express.startApp(app, config);
});
