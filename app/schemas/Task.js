module.exports = () => [Task, Note]; // eslint-disable-line no-use-before-define

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
    createdAt: String!
    updatedAt: String!
  }
`;
