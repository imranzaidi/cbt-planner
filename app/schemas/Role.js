/***********************
 * Module Dependencies *
 ***********************/
const Goal = require('./Goal'),
  Stakeholder = require('./Stakeholder');


/**********
 * Schema *
 **********/
const Role = `
  type Role {
    id: Int!
    title: String!
    clarifyingStatements: String!
    stakeholders: [Stakeholder]
    goals: [Goal]
  }
`;


module.exports = () => [Role, Goal, Stakeholder];
