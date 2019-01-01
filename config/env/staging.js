/******************
 * Module Members *
 ******************/
// App
const SECRET = process.env.SECRET || 'ADFEdfiaef12345134asdfkWEFasdase1345rhASDF23';
const FRONT_END_ORIGIN = process.env.CBT_PLANNER_FRONT_END_ORIGIN_STAGING || process.env.FRONT_END_ORIGIN
  || 'http://localhost:3000';
// DB
const DB_HOST = process.env.CBT_PLANNER_DB_HOST_STAGING || process.env.DB_HOST || 'localhost';
const DB_USERNAME = process.env.CBT_PLANNER_DB_USERNAME_STAGING || process.env.DB_USERNAME || 'local';
const DB_PASSWORD = process.env.CBT_PLANNER_DB_PASSWORD_STAGING || process.env.DB_PASSWORD || '';


const developmentConfig = {
  app: {
    protocol: 'http',
    host: 'localhost',
    port: 3005,
    env: 'staging',
    secret: SECRET,
    frontEndOrigin: FRONT_END_ORIGIN
  },

  db: {
    host: DB_HOST,
    dbName: 'cbtplannerstaging',
    dialect: 'postgres',
    username: DB_USERNAME,
    password: DB_PASSWORD
  }
};


module.exports = developmentConfig;
