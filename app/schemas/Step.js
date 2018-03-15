/***********************
 * Module Dependencies *
 ***********************/
const Goal = require('./Goal');


/**********
 * Schema *
 **********/
const Step = `
  type Step {
    id: Int!
    description: String!
    deadline: String!
    complete: Boolean!
    goal: Goal!
  }
`;


module.exports = () => [Step, Goal];
