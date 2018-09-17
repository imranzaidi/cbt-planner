module.exports = () => [Value, Goal]; // eslint-disable-line no-use-before-define


/***********************
 * Module Dependencies *
 ***********************/
const Goal = require('./Goal');


/**********
 * Schema *
 **********/
const Value = `
  type Value {
    id: Int!
    valueStatement: String!
    description: String!
    category: String!
    goals: [Goal]
  }
`;
