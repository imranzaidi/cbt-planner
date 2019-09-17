/***********************
 * Module Dependencies *
 ***********************/
const apolloServerExpress = require('apollo-server-express'),
  bodyParser = require('body-parser'),
  chalk = require('chalk'),
  cookieParser = require('cookie-parser'),
  config = require('../config'),
  cors = require('cors'),
  graphqlSchemaService = require('./graphqlSchema'),
  express = require('express'),
  helmet = require('helmet'),
  jsonwebtoken = require('jsonwebtoken'),
  logger = require('./logger'),
  morgan = require('morgan'),
  routes = require('../../app/consts/routes');

const { LOGIN_REGISTER_ROUTE, LOGIN_ROUTE } = routes;


/**
 * Middleware that facilitates user login and auth.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @returns {Promise<*>}
 */
async function addUser(req, res, next) {
  const query = req.body && req.body.query;
  const introspectionQuery = query.match('IntrospectionQuery');
  const loginOrRegisterMutation = req.originalUrl === LOGIN_REGISTER_ROUTE;
  const loginRoute = req.originalUrl === LOGIN_ROUTE;

  if (query && !introspectionQuery && !loginRoute && !loginOrRegisterMutation) {
    try {
      const token = req.headers.authorization || req.cookies.id;
      const { user } = await jsonwebtoken.verify(token, config.app.secret);
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
  app.use(cookieParser());

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

  // allow cors for graphql client & front-end
  app.use(cors({ credentials: true, origin: config.app.frontEndOrigin }));
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
    schemas = graphqlSchemaService.generateSchemas();

  const standardGraphQLServerArg = {
    schema: schemas.standardSchema,
    context: ({ req }) => ({ // eslint-disable-line arrow-parens
      models: sequelizeService.models,
      SECRET: config.app.secret,
      user: req.user
    })
  };
  if (process.env.NODE_ENV === 'production') standardGraphQLServerArg.debug = false;

  const loginRegisterGraphQLServerArg = {
    schema: schemas.loginRegisterSchema,
    context: {
      models: sequelizeService.models,
      SECRET: config.app.secret
    }
  };
  if (process.env.NODE_ENV === 'production') loginRegisterGraphQLServerArg.debug = false;

  const standardGraphQLServer = new ApolloServer(standardGraphQLServerArg);
  const loginRegisterGraphQLServer = new ApolloServer(loginRegisterGraphQLServerArg);

  standardGraphQLServer.applyMiddleware({
    app,
    cors: { credentials: true, origin: config.app.frontEndOrigin }
  });
  loginRegisterGraphQLServer.applyMiddleware({
    app,
    cors: { credentials: true, origin: config.app.frontEndOrigin },
    path: LOGIN_REGISTER_ROUTE });
}

/**
 * Add REST routes to server.
 *
 * @param {Object} app - express application instance
 * @param {Object} sequelizeService - sequelize service with models
 */
function bindRESTRoutes(app, sequelizeService) {
  // eslint-disable-next-line global-require
  const bindAuthRoutes = require('../../app/rest/authenticationRoutes');
  bindAuthRoutes(app, sequelizeService);
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
  bindRESTRoutes(app, sequelizeService);

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
