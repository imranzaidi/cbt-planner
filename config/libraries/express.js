/***********************
 * Module Dependencies *
 ***********************/
const chalk = require('chalk'),
  express = require('express'),
  bodyParser = require('body-parser'),
  path = require('path');


/******************
 * Module Members *
 ******************/
// const URL = `${config.app.protocol}://${config.app.host}:${config.app.port}`;


/**
 * Initialize middleware.
 *
 * @param app {Object} express application
 */
function initializeMiddleware(app) {
  app.use(bodyParser.urlencoded({ extended: true }));
}

/**
 * Set up routes.
 *
 * @param app {Object} express application
 */
function loadRoutes(app, routePaths) {
  routePaths.forEach((routePath) => {
    const route = require(path.resolve(routePath)); // eslint-disable-line
    route(app);
  });
}

/**
 * Start the server.
 *
 * @param app {Object} express application
 */
function startApp(app, config) {
  // TODO: Investigate ability to bind URL.
  app.listen(config.app.port, () => {
    console.info(chalk.blue(`We are live on port ${config.app.port}:`));
  });
}

function initialize(config) {
  const app = express();

  this.loadRoutes(app, config.paths.routes);
  this.initializeMiddleware(app);

  return app;
}


module.exports = {
  initializeMiddleware,
  loadRoutes,
  startApp,
  initialize
};
