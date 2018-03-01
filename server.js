/***********************
 * Module Dependencies *
 ***********************/
const expressService = require('./config/libraries/express'),
  sequelizeService = require('./config/libraries/sequelize'),
  config = require('./config/config');


const postgresDB = sequelizeService.getDBInstance(config),
  app = expressService.initialize(config);

postgresDB.sequelize.sync().then(() => { expressService.startApp(app, config); });
