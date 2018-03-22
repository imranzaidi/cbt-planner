/***********************
 * Module Dependencies *
 ***********************/
const apolloServerExpress = require('apollo-server-express'),
  bodyParser = require('body-parser'),
  chalk = require('chalk'),
  config = require('../config'),
  graphqlSchemaService = require('./graphqlSchema'),
  express = require('express'),
  helmet = require('helmet'),
  logger = require('./logger'),
  methodOverride = require('method-override'),
  morgan = require('morgan'),
  path = require('path');


/**
 * Initialize middleware.
 *
 * @param {Object} app - express application instance
 */
function initializeMiddleware(app) {
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
 */
function loadRoutes(app) { // eslint-disable-line no-unused-vars
  // TODO: remove eslint disable once used
  config.paths.routes.forEach((routePath) => {
    const bindRoutes = require(path.resolve(routePath)); // eslint-disable-line
    bindRoutes(app);
  });
}

/**
 * Add GraphQL to server.
 *
 * @param {Object} app - express application instance
 */
function initGraphQLEndpoints(app, sequelizeService) {
  const { graphiqlExpress, graphqlExpress } = apolloServerExpress,
    schema = graphqlSchemaService.generateSchema();

  app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
  app.use('/graphql', graphqlExpress({
    schema,
    context: {
      models: sequelizeService.models
    }
  }));
}

/**
 * Initializes Express application.
 *
 * @returns {Object} app - express application instance
 */
function initialize(sequelizeService) {
  const app = express();

  initializeMiddleware(app);
  // TODO: uncomment once we have some REST endpoints
  // this.loadRoutes(app);
  initGraphQLEndpoints(app, sequelizeService);

  return app;
}

/**
 * Start the server.
 *
 * @param {Object} app - express application instance
 */
function startApp(app) {
  app.listen(config.app.port, config.app.host, () => {
    console.info(chalk.blue(`We are live on port ${config.app.port}:`)); // eslint-disable-line no-console
  });
}


module.exports = {
  initialize,
  startApp
};
