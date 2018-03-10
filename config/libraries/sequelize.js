/***********************
 * Module Dependencies *
 ***********************/
const Sequelize = require('sequelize'),
  config = require('../config');


/******************
 * Module Members *
 ******************/
const db = {};


/**
 * Helper function; parses model name from path string.
 *
 * @param {String} path - file path
 * @returns {String} * - model file name with the first letter capitalized
 */
function getModelName(path) {
  const modelName = path.replace('app/models/sequelize/', '').replace('.js', '');
  return modelName.charAt(0).toUpperCase() + modelName.slice(1);
}

/**
 * Loads all models and forms associations.
 *
 * @param {Object} sequelize - Sequelize instance
 * @param {Array} paths - a list of model paths
 * @returns {Object} db - a database object
 */
function loadModels(sequelize, paths) {
  // Load models
  const models = paths.reduce((acc, path) => {
    acc[getModelName(path)] = sequelize.import(`../../${path}`);
    return acc;
  }, {});

  // Form associations
  Object.keys(models).forEach((modelName) => {
    if ('associate' in models[modelName]) {
      models[modelName].associate(models);
    }
  });

  return models;
}

/**
 * Connects to Postgres database.
 *
 * @returns {Object} new sequelize instance
 */
function connect() {
  const { dbName, username, password, dialect, host } = config.db,
    sequelizeConfig = {
      host,
      dialect,
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    };

  return new Sequelize(dbName, username, password, sequelizeConfig);
}


const sequelize = connect();
db.models = loadModels(sequelize, config.paths.models);
db.sequelize = sequelize;


module.exports = db;
