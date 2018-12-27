/***********************
 * Module Dependencies *
 ***********************/
const _ = require('lodash'),
  apolloServerExpress = require('apollo-server-express'),
  bcrypt = require('bcrypt'),
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
  { errorMessages } = require('../../app/consts/loginRegistration');

const LOGIN_REGISTER_ROUTE = '/login-register';
const LOGIN_ROUTE = '/login';


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
  const introspectionQuery = req.body.operationName === 'IntrospectionQuery';
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

  standardGraphQLServer.applyMiddleware({ app });
  loginRegisterGraphQLServer.applyMiddleware({ app, path: LOGIN_REGISTER_ROUTE });
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

  // route for securely integrating authentication on the client-side
  app.post(LOGIN_ROUTE, async (req, res) => {
    const { email, password } = req.body;
    const user = await sequelizeService.models.User.findOne({ where: { email } });
    if (!user) {
      return res.status(422).send({ error: errorMessages.emailLookUp });
    }

    const valid = bcrypt.compareSync(password, user.password);
    if (!valid) {
      return res.status(422).send({ error: errorMessages.incorrectPassword });
    }

    const token = jsonwebtoken.sign(
      { user: _.pick(user, ['id', 'username', 'email']) },
      config.app.secret,
      { expiresIn: '2h' },
    );

    res.cookie('id', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 // 2 hours
    });

    return res.status(200).send({ message: 'Authenticated.' });
  });

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
