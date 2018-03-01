/***********************
 * Module Dependencies *
 ***********************/
const apolloServerExpress = require('apollo-server-express'),
  bodyParser = require('body-parser'),
  chalk = require('chalk'),
  express = require('express'),
  helmet = require('helmet'),
  logger = require('./logger'),
  methodOverride = require('method-override'),
  morgan = require('morgan'),
  path = require('path');


/******************
 * Module Members *
 ******************/
const { graphiqlExpress, graphqlExpress } = apolloServerExpress;


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
 * Set up REST routes.
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
 * Add GraphQL to server.
 *
 * @param {Object} app - express application instance
 * @param {*} schema - some kind of schema type < TODO: update once we know
 * @param {Object} db - sequelize postgres database instance
 */
function initGraphQLEndpoints(app, schema, db) {
  app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
  app.use('/graphql', graphqlExpress({ schema, context: { db } }));
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
  // TODO: refactor once all mongoose models are replaced with sequelize models
  // this.loadRoutes(app, config.paths.routes);

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
  initGraphQLEndpoints,
  initialize,
  startApp
};
