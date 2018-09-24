/******************
 * Module Members *
 ******************/
const DEFAULT_SECRET = 'ADFEdfiaef12345134asdfkWEFasdase1345rhASDF23';


const developmentConfig = {
  app: {
    protocol: 'http',
    host: 'localhost',
    port: 3005,
    env: 'development',
    secret: process.env.SECRET || DEFAULT_SECRET
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
