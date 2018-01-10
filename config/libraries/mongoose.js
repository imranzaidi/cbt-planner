/***********************
 * Module Dependencies *
 ***********************/
const chalk = require('chalk'),
  mongoose = require('mongoose'),
  path = require('path');


/******************
 * Module Members *
 ******************/
const DATABASE_SYSTEM_NAME = 'MongoDB';


/**
 * Loads all models.
 *
 * @param {Array} modelPaths - a list of relative string paths
 */
function loadModels(modelPaths) {
  modelPaths.forEach((modelPath) => {
    const model = require(path.resolve(modelPath)); // eslint-disable-line

    if (model.name && model.schema) {
      mongoose.model(model.name, model.schema);
    }
  });
}

/**
 * Establishes database connection.
 *
 * @param {Object} db - database configuration info
 * @param {Function} callback - callback function
 */
function connect(db, callback) {
  const dbURL = `mongodb://${db.host}/${db.name}`;
  const dbOptions = JSON.parse(JSON.stringify(db.options || {}));

  mongoose.Promise = db.promise;

  Object.assign(dbOptions, {
    useMongoClient: true,
    autoReconnect: true,
    reconnectInterval: 500,
    reconnectTries: 10
  });

  return mongoose.connect(dbURL, dbOptions)
    .then((connection) => {
      mongoose.set('debug', db.debug);

      callback(connection.db);
    }).catch((error) => {
      /* eslint-disable no-console */
      console.error(chalk.red(`Unable to connect to ${DATABASE_SYSTEM_NAME}!`), error);
      /* eslint-enable */

      callback(null, error);
    });
}

/**
 * Closes database connection.
 *
 * @param {Function} callback - callback function
 */
function disconnect(callback) {
  mongoose.connection.db.close((error) => {
    console.info(chalk.yellow(`Disconnected from ${DATABASE_SYSTEM_NAME}.`)); // eslint-disable-line no-console

    return callback(error);
  });
}


module.exports = {
  loadModels,
  connect,
  disconnect
};
