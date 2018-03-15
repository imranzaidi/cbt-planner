/***********************
 * Module Dependencies *
 ***********************/
const Goal = require('./goal');


/**********
 * Schema *
 **********/
const Step = `
  type Step {
    id: ID!
    description: String!
    deadline: String!
    complete: Boolean!
    goal: Goal!
  }
`;


module.exports = () => [Step, Goal];
