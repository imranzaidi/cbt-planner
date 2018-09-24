/****************************************************************************
 * This module assumes PostgreSQL is installed and running on your system.  *
 *                                                                          *
 * Note: Sanity check to make sure we never drop the wrong database!        *
 ****************************************************************************/
if (process.env.NODE_ENV !== 'test') process.env.NODE_ENV = 'test';


/***********************
 * Module Dependencies *
 ***********************/
const config = require('../config/config'),
  chalk = require('chalk'),
  { execSync } = require('child_process'),
  sequelizeService = require('../config/libraries/sequelize');


/**
 * Sets up a database for testing.
 *
 * @returns {Promise<void>}
 */
function setupDatabase() {
  execSync(`dropdb --if-exists ${config.db.dbName}`);
  execSync(`createdb ${config.db.dbName}`);
  execSync(`psql -U ${config.db.username} -d ${config.db.dbName} -c` +
    ` "GRANT ALL PRIVILEGES ON DATABASE ${config.db.dbName} TO ${config.db.username};"`);
}

/**
 * Sets up models, associations, creates tables and connects to PostgreSQL. Intended
 * for use in beforeEach() and / or before() hooks for testing frameworks.
 *
 * @returns {Promise<void>}
 */
async function connect() {
  await sequelizeService.sequelize.sync({
    force: true,
    logging: false
  });

  console.log(chalk.green('Database ready!')); // eslint-disable-line no-console
}

/**
 * Closes connection to the test database. Intended for use in afterEach()
 * and / or after() hooks for testing frameworks.
 *
 * @returns {Promise<void>}
 */
async function closeConnection() {
  await sequelizeService.sequelize.close();
  console.log(chalk.blue('Database connection closed.')); // eslint-disable-line no-console
}


module.exports = {
  setupDatabase,
  connect,
  closeConnection
};
