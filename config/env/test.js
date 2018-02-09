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
    name: 'cbt-planner-test',
    port: 27017,
    debug: process.env.DB_DEBUG || true,
    promise: global.Promise
  }
};


module.exports = testConfig;
