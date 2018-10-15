/***********************
 * Module Dependencies *
 ***********************/
const _ = require('lodash'),
  config = require('../config'),
  fs = require('fs'),
  graphqlTools = require('graphql-tools'),
  path = require('path');


/**
 * Loads all schemas.
 *
 * @returns {Object} * - a key value pair of schema name and import
 */
function getSchemas() {
  return config.paths.schemas.reduce((acc, schemaPath) => {
    const schemaName = schemaPath.replace('app/schemas/', '').replace('.js', '');

    acc[schemaName] = require(path.resolve(schemaPath)); // eslint-disable-line
    return acc;
  }, {});
}

/**
 * Loads all resolvers.
 *
 * @returns {Object} * - a key value pair of resolver name and import
 */
function getResolvers() {
  return config.paths.resolvers.reduce((acc, resolverPath) => {
    const resolverName = resolverPath.replace('app/resolvers/', '').replace('.js', '');

    acc[resolverName] = require(path.resolve(resolverPath)); // eslint-disable-line
    return acc;
  }, {});
}

/**
 * Generates a combined schema from individual schemas.
 */
function generateSchemas() {
  const { makeExecutableSchema } = graphqlTools,
    schemas = getSchemas(),
    resolvers = getResolvers(),
    { Task, TaskList, Note, User, JWTVerification } = schemas;

  const SchemaDefinition = fs.readFileSync(path.join(__dirname, 'schema.graphqls')).toString();
  const LoginRegisterSchemaDefinition = fs.readFileSync(path.join(__dirname, 'login.register.graphqls')).toString();

  const typeDefs = [SchemaDefinition, Task, TaskList, Note, User];
  const rootResolver = _.merge({}, resolvers.Task, resolvers.TaskList, resolvers.Note, resolvers.User);
  const loginRegisterTypeDefs = [LoginRegisterSchemaDefinition, User, JWTVerification];
  const loginRegisterRootResolver = _.merge({}, resolvers.LoginRegister);

  const loginRegisterSchema = makeExecutableSchema({
    typeDefs: loginRegisterTypeDefs,
    resolvers: loginRegisterRootResolver
  });

  const standardSchema = makeExecutableSchema({
    typeDefs,
    resolvers: rootResolver
  });

  return { loginRegisterSchema, standardSchema };
}


module.exports = {
  generateSchemas
};
