/***********************
 * Module Dependencies *
 ***********************/
const chalk = require('chalk'),
  expressService = require('./config/libraries/express'),
  sequelizeService = require('./config/libraries/sequelize');


/******************
 * Module Members *
 ******************/
const app = expressService.initialize(sequelizeService);


sequelizeService.sequelize.sync().then(() => {
  expressService.startApp(app);
}).catch((err) => {
  // eslint-disable-next-line no-console
  console.log(chalk.red('Sequelize sync() error:'), err);
});
