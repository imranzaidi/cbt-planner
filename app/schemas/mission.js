/***********************
 * Module Dependencies *
 ***********************/
const Goal = require('./goal');


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
