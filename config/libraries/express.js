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


/**
 * Initialize middleware.
 *
 * @param {Object} app - express application instance
 * @param {Object} config - application configuration
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
 * @param {Object} app - express application instance
 * @param {Array} routePaths - an list of string with the relative path to each route
 */
function loadRoutes(app, routePaths) {
  routePaths.forEach((routePath) => {
    const bindRoutes = require(path.resolve(routePath)); // eslint-disable-line
    bindRoutes(app);
  });
}

/**
 * Initializes Express application.
 *
 * @param {Object} config - application configuration
 * @returns {Object} app - express application instance
 */
function initialize(config) {
  const app = express();

  this.initializeMiddleware(app, config);
  this.loadRoutes(app, config.paths.routes);

  return app;
}

/**
 * Start the server.
 *
 * @param {Object} app - express application instance
 * @param {Object} config - application configuration
 */
function startApp(app, config) {
  app.listen(config.app.port, config.app.host, () => {
    console.info(chalk.blue(`We are live on port ${config.app.port}:`)); // eslint-disable-line no-console
  });
}


module.exports = {
  initializeMiddleware,
  loadRoutes,
  initialize,
  startApp
};
