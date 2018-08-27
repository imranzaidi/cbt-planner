/******************
 * Module Members *
 ******************/
const developmentConfig = {
  app: {
    protocol: 'http',
    host: 'localhost',
    port: 3005,
    env: 'development'
  },

  db: {
    host: 'localhost',
    dbName: 'cbt_planner',
    dialect: 'postgres',
    username: process.env.POSTGRES_USERNAME || 'local',
    password: process.env.POSTGRES_PASSWORD || ''
  }
};


module.exports = developmentConfig;
