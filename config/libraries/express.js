/***********************
 * Module Dependencies *
 ***********************/
const apolloServerExpress = require('apollo-server-express'),
  bodyParser = require('body-parser'),
  chalk = require('chalk'),
  config = require('../config'),
  cors = require('cors'),
  graphqlSchemaService = require('./graphqlSchema'),
  express = require('express'),
  helmet = require('helmet'),
  logger = require('./logger'),
  morgan = require('morgan');


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

  // allow cors for graphql client
  app.use(cors());
}

/**
 * Add GraphQL to server.
 *
 * @param {Object} app - express application instance
 * @param {Object} sequelizeService - sequelize service with models
 */
function initGraphQLEndpoints(app, sequelizeService) {
  const { ApolloServer } = apolloServerExpress,
    schema = graphqlSchemaService.generateSchema();

  const graphQLServer = new ApolloServer({
    schema,
    context: {
      models: sequelizeService.models
    }
  });

  graphQLServer.applyMiddleware({ app });
}

/**
 * Initializes Express application.
 *
 * @param {Object} sequelizeService - sequelize service with models
 * @returns {Object} app - express application instance
 */
function initialize(sequelizeService) {
  const app = express();

  initializeMiddleware(app);
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
