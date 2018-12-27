/******************
 * Module Members *
 ******************/
const DEFAULT_SECRET = 'ADFEdfiaef12345134asdfkWEFasdase1345rhASDF23';


const testConfig = {
  app: {
    protocol: 'http',
    host: 'localhost',
    port: 3010,
    env: 'test',
    secret: process.env.SECRET || DEFAULT_SECRET,
    frontEndOrigin: 'http://localhost:3000'
  },

  db: {
    host: 'localhost',
    dbName: 'cbt_planner_test',
    dialect: 'postgres',
    username: process.env.POSTGRES_USERNAME || 'local',
    password: process.env.POSTGRES_PASSWORD || ''
  }
};


module.exports = testConfig;
