/***********************
 * Module Dependencies *
 ***********************/
const Mission = require('./Mission'),
  Role = require('./Role'),
  Step = require('./Step'),
  Value = require('./Value');


/**********
 * Schema *
 **********/
const Goal = `
  type Goal {
    id: ID!
    statement: String!
    values: [Value]
    missions: [Mission]
    roles: [Role]
    steps: [Step]
  }
`;


module.exports = () => [Goal, Mission, Role, Step, Value];
