module.exports = () => [TaskList, Task, User]; // eslint-disable-line no-use-before-define


/***********************
 * Module Dependencies *
 ***********************/
const Task = require('./Task');
const User = require('./User');


/**********
 * Schema *
 **********/
const TaskList = `
  type TaskList {
    id: Int!
    startDate: String!
    type: String!
    tasks: [Task]
    user: User!
    createdAt: String!
    updatedAt: String!
  }
`;
