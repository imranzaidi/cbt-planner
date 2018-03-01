/***********************
 * Module Dependencies *
 ***********************/
const expressService = require('./config/libraries/express'),
  mongooseService = require('./config/libraries/mongoose'),
  sequelizeService = require('./config/libraries/sequelize'),
  config = require('./config/config');


mongooseService.connect(config.db.mongoose, (db, error) => { // eslint-disable-line no-unused-vars
  mongooseService.loadModels(config.paths.models.mongoose);
  const postgresDB = sequelizeService.connect(config),
    app = expressService.initialize(config);
  postgresDB.sequelize.sync().then(() => { expressService.startApp(app, config); });
  // expressService.startApp(app, config);
});

// TODO: uncomment and refactor after stripping out mongoose
// const postgresDB = sequelizeService.connect(config),
//   app = expressService.initialize(config);
// postgresDB.sequelize.sync().then(() => { expressService.startApp(app, config); });
