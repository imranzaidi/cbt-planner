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
  jsonwebtoken = require('jsonwebtoken'),
  logger = require('./logger'),
  morgan = require('morgan');


/**
 * Middleware that facilitates user login and auth.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @returns {Promise<*>}
 */
async function addUser(req, res, next) {
  const token = req.headers.authorization;
  const query = req.body && req.body.query;
  const introspectionQuery = req.body.operationName === 'IntrospectionQuery';
  const loginOrRegisterMutation = req.originalUrl === '/login-register';

  if (!loginOrRegisterMutation && query && !introspectionQuery) {
    try {
      const { user } = await jsonwebtoken.verify(token, process.env.SECRET);
      req.user = user;
    } catch (err) {
      console.log(chalk.red('Authorization:'), err); // eslint-disable-line no-console

      res.status(401);
      return res.send({ message: err.message });
    }
  }
  return next();
}

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

  // allow cors for graphql client
  app.use(cors());
  app.use(addUser);
}

/**
 * Add GraphQL to server.
 *
 * @param {Object} app - express application instance
 * @param {Object} sequelizeService - sequelize service with models
 */
function initGraphQLEndpoints(app, sequelizeService) {
  const { ApolloServer } = apolloServerExpress,
    schemas = graphqlSchemaService.generateSchema();

  const standardGraphQLServer = new ApolloServer({
    schema: schemas.standardSchema,
    context: ({ req }) => ({ // eslint-disable-line arrow-parens
      models: sequelizeService.models,
      SECRET: process.env.SECRET || 'ADFEdfiaef12345134asdfkWEFasdase1345rhASDF23',
      user: req.user
    })
  });

  const loginRegisterGraphQLServer = new ApolloServer({
    schema: schemas.loginRegisterSchema,
    context: ({ req }) => ({ // eslint-disable-line arrow-parens
      models: sequelizeService.models,
      SECRET: process.env.SECRET || 'ADFEdfiaef12345134asdfkWEFasdase1345rhASDF23',
      user: req.user
    })
  });

  standardGraphQLServer.applyMiddleware({ app });
  loginRegisterGraphQLServer.applyMiddleware({ app, path: '/login-register' });
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
