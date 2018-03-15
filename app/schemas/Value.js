/***********************
 * Module Dependencies *
 ***********************/
const Goal = require('./Goal');


/**********
 * Schema *
 **********/
const Value = `
  type Value {
    id: ID!
    valueStatement: String!
    description: String!
    category: String!
    goals: [Goal]
  }
`;


module.exports = () => [Value, Goal];
