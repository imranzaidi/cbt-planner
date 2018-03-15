/***********************
 * Module Dependencies *
 ***********************/
const Goal = require('./Goal');


/**********
 * Schema *
 **********/
const Mission = `
  type Mission {
    id: ID!
    statement: String!
    accomplished: Boolean!
    goals: [Goal]
  }
`;


module.exports = () => [Mission, Goal];
