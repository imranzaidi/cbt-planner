/***********************
 * Module Dependencies *
 ***********************/
const Note = require('./Note');


/**********
 * Schema *
 **********/
const Task = `
  type Task {
    id: Int!
    description: String!
    priority: String!
    status: String!
    due: String
    notes: [Note]
  }
`;


module.exports = () => [Task, Note];
