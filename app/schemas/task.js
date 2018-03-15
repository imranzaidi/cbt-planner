/***********************
 * Module Dependencies *
 ***********************/
const Note = require('./note');


/**********
 * Schema *
 **********/
const Task = `
  type Task {
    id: ID!
    description: String!
    priority: String!
    status: String!
    due: String
    notes: [Note]
  }
`;


module.exports = () => [Task, Note];
