/***********************
 * Module Dependencies *
 ***********************/
const Task = require('./Task');


/**********
 * Schema *
 **********/
const Note = `
  type Note {
    id: ID!
    content: String!
    task: Task!
  }
`;


module.exports = () => [Note, Task];
