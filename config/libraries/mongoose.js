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
 * @param modelPaths {Array} string path literals with out project root
 */
function loadModels(modelPaths) {
  modelPaths.forEach((modelPath) => {
    let model = require(path.resolve(modelPath)); // eslint-disable-line

    if (model.name && model.schema) {
      mongoose.model(model.name, model.schema);
    }
  });
}

/**
 * Established database connection.
 *
 * @param db {Object} contains database configuration info
 * @param callback {Function} callback function
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
      console.error(chalk.red(`Unable to connect to ${DATABASE_SYSTEM_NAME}!`), error);

      callback(null, error);
    });
}

/**
 * Closes database connection.
 *
 * @param callback {Function} callback function
 */
function disconnect(callback) {
  mongoose.connection.db
    .close((error) => {
      console.info(chalk.yellow(`Disconnected from ${DATABASE_SYSTEM_NAME}.`));

      return callback(error);
    });
}


module.exports = {
  loadModels,
  connect,
  disconnect
};
