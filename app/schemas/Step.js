module.exports = () => [Step, Goal]; // eslint-disable-line no-use-before-define


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
