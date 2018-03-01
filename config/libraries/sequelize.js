/***********************
 * Module Dependencies *
 ***********************/
const Sequelize = require('sequelize');


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
    const modelName = path.replace('app/models/sequelize/', '').replace('.js', '');
    acc[modelName] = sequelize.import(`../../${path}`);
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
 * @returns {Object} db - a connected database instance with all models and associations
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

  const sequelize = new Sequelize(name, username, password, sequelizeConfig);
  const db = loadModels(sequelize, config.paths.models.sequelize);

  // Attach instance
  db.sequelize = sequelize;

  return db;
}


module.exports = {
  connect
};
