module.exports = () => [Note, Task]; // eslint-disable-line no-use-before-define


/***********************
 * Module Dependencies *
 ***********************/
const Task = require('./Task');


/**********
 * Schema *
 **********/
const Note = `
  type Note {
    id: Int!
    content: String!
    task: Task!
  }
`;
