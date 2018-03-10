/***********************
 * Module Dependencies *
 ***********************/
const expressService = require('./config/libraries/express'),
  sequelizeService = require('./config/libraries/sequelize');


/******************
 * Module Members *
 ******************/
const app = expressService.initialize();


sequelizeService.sequelize.sync().then(() => { expressService.startApp(app); });
