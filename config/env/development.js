/******************
 * Module Members *
 ******************/
const developmentConfig = {
  app: {
    protocol: 'http',
    host: 'localhost',
    port: 3000,
    env: 'development'
  },

  db: {
    host: 'localhost',
    name: 'cbt-planner',
    port: 27017,
    debug: process.env.DB_DEBUG || true,
    promise: global.Promise
  }
};


module.exports = developmentConfig;
