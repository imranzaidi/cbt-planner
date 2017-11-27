/***********************
 * Module Dependencies *
 ***********************/
const chalk = require('chalk'),
  express = require('express'),
  bodyParser = require('body-parser'),
  morgan = require('morgan'),
  logger = require('./logger'),
  helmet = require('helmet'),
  methodOverride = require('method-override'),
  path = require('path');


/******************
 * Module Members *
 ******************/

// const URL = `${config.app.protocol}://${config.app.host}:${config.app.port}`;


/**
 * Initialize middleware.
 *
 * @param app {Object} express application
 * @param config {Object} application configuration
 */
function initializeMiddleware(app, config) {
  // parsing requests
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  // logging
  app.use(morgan('common', {
    stream: logger.stream
  }));

  // lets simple clients' requests simulate DELETE and PUT
  app.use(methodOverride());

  // secure HTTP headers
  app.use(helmet.dnsPrefetchControl());
  app.use(helmet.frameguard());
  app.use(helmet.hidePoweredBy());
  app.use(helmet.hsts());
  app.use(helmet.ieNoOpen());
  app.use(helmet.noSniff());
  app.use(helmet.xssFilter());
  app.use(helmet.referrerPolicy({ policy: 'same-origin' }));
  if (config.app.env === 'development') {
    app.use(helmet.noCache());
  }
  // TODO: Consider adding helmet.contentSecurityPolicy() for strict control of asset origin.
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
 * @param config {Object} application configuration
 */
function startApp(app, config) {
  // TODO: Investigate ability to bind URL.
  app.listen(config.app.port, () => {
    console.info(chalk.blue(`We are live on port ${config.app.port}:`));
  });
}

function initialize(config) {
  const app = express();

  this.initializeMiddleware(app, config);
  this.loadRoutes(app, config.paths.routes);

  return app;
}


module.exports = {
  initializeMiddleware,
  loadRoutes,
  startApp,
  initialize
};
