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
    mongoose: {
      host: 'localhost',
      name: 'cbt-planner',
      port: 27017,
      debug: process.env.DB_DEBUG || true,
      promise: global.Promise
    },
    postgres: {
      host: 'localhost',
      name: 'cbt_planner',
      username: process.env.POSTGRES_USERNAME || 'local',
      password: process.env.POSTGRES_PASSWORD || ''
    }
  }
};


module.exports = developmentConfig;
