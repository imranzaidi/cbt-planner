/***********************
 * Module Dependencies *
 ***********************/
const expressService = require('./config/libraries/express'),
  mongooseService = require('./config/libraries/mongoose'),
  config = require('./config/config');


/******************
 * Module Members *
 ******************/
let app;


mongooseService.connect(config.db, (db, error) => { // eslint-disable-line no-unused-vars
  mongooseService.loadModels(config.paths.models);
  app = expressService.initialize(config);
  expressService.startApp(app, config);
});
