module.exports = () => [TaskList, Task]; // eslint-disable-line no-use-before-define


/***********************
 * Module Dependencies *
 ***********************/
const Task = require('./Task');


/**********
 * Schema *
 **********/
const TaskList = `
  type TaskList {
    id: Int!
    startDate: String!
    type: String!
    tasks: [Task]
    createdAt: String!
    updatedAt: String!
  }
`;
