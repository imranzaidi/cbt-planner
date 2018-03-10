/******************
 * Module Members *
 ******************/
const testConfig = {
  app: {
    protocol: 'http',
    host: 'localhost',
    port: 3010,
    env: 'test'
  },

  db: {
    host: 'localhost',
    dbName: 'cbt_planner',
    dialect: 'postgres',
    username: process.env.POSTGRES_USERNAME || 'local',
    password: process.env.POSTGRES_PASSWORD || ''
  }
};


module.exports = testConfig;
