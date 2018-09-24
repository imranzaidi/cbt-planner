module.exports = () => [Task, Note, User]; // eslint-disable-line no-use-before-define


/***********************
 * Module Dependencies *
 ***********************/
const Note = require('./Note'),
  User = require('./User');


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
    user: User
    createdAt: String!
    updatedAt: String!
  }
`;
