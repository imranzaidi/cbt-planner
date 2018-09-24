/****************************************************************************
 * Note: Sanity check to make sure we never drop the wrong database!        *
 ****************************************************************************/
if (process.env.NODE_ENV !== 'test') process.env.NODE_ENV = 'test';


/***********************
 * Module Dependencies *
 ***********************/
const chalk = require('chalk'),
  { createServer } = require('http'),
  { setupDatabase } = require('./testDBSetup'),
  expressService = require('../config/libraries/express'),
  sequelizeService = require('../config/libraries/sequelize');


/******************
 * Module Members *
 ******************/
const app = expressService.initialize(sequelizeService);
let server;


async function startServer() {
  setupDatabase();
  await sequelizeService.sequelize.sync();

  server = createServer(app);
  await server.listen('3333');
  console.log(chalk.green('Test server up.')); // eslint-disable-line no-console
}

async function shutDownServer() {
  await server.close();
  console.log(chalk.blue('Test server down.')); // eslint-disable-line no-console
}


module.exports = {
  startServer,
  shutDownServer
};
