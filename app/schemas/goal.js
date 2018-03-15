/***********************
 * Module Dependencies *
 ***********************/
const Mission = require('./mission'),
  Role = require('./role'),
  Step = require('./step'),
  Value = require('./value');


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
