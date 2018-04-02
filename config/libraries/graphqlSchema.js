/***********************
 * Module Dependencies *
 ***********************/
const _ = require('lodash'),
  config = require('../config'),
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
function generateSchema() {
  const { makeExecutableSchema } = graphqlTools,
    schemas = getSchemas(),
    resolvers = getResolvers(),
    { Task, Note } = schemas;

  const Query = `
    type Query {
      getTask(id: Int!): Task
      getTasksDueBy(date: String!): [Task]
      getNote(id: Int!): Note
    }
  `;

  const Mutation = `
    type Mutation {
      createTask(description: String!): Task
      updateTask(id: Int!, description: String!, status: String, priority: String, due: String): [Int!]!
      deleteTask(id: Int!): Int!
      createNote(taskId: Int!, content: String!): Note
      updateNote(id: Int!, content: String!): [Int!]!
      deleteNote(id: Int!): Int!
    }
  `;

  const SchemaDefinition = `
    schema {
      query: Query
      mutation: Mutation
    }
  `;

  const typeDefs = [SchemaDefinition, Query, Mutation, Task, Note];
  const rootResolver = _.merge({}, resolvers.Task, resolvers.Note);

  return makeExecutableSchema({
    typeDefs,
    resolvers: rootResolver
  });
}


module.exports = {
  generateSchema
};
