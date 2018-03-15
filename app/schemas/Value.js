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


module.exports = () => [Value, Goal];
