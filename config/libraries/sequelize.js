/***********************
 * Module Dependencies *
 ***********************/
const Sequelize = require('sequelize');


/**
 * Helper function; parses model name from path string.
 *
 * @param {String} path - file path
 * @returns {string}
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
  const db = paths.reduce((acc, path) => {
    acc[getModelName(path)] = sequelize.import(`../../${path}`);
    return acc;
  }, {});

  // Form associations
  Object.keys(db).forEach((modelName) => {
    if ('associate' in db[modelName]) {
      db[modelName].associate(db);
    }
  });

  return db;
}

/**
 * Connects to Postgres database.
 *
 * @param {Object} config - application configurations
 * @returns {Object} new sequelize instance
 */
function connect(config) {
  const { name, username, password, host } = config.db.postgres,
    sequelizeConfig = {
      host,
      dialect: 'postgres',
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    };

  return new Sequelize(name, username, password, sequelizeConfig);
}

/**
 * Initializes database connection and returns an instance ready for use.
 *
 * @param {Object} config - application configurations
 * @returns {Object} db - a connected database instance with all models and associations
 */
function getDBInstance(config) {
  const sequelize = connect(config);
  const db = loadModels(sequelize, config.paths.models.sequelize);

  // Attach sequelize instance
  db.sequelize = sequelize;

  return db;
}


module.exports = {
  getDBInstance
};
