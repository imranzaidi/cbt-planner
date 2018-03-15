/***********************
 * Module Dependencies *
 ***********************/
const Goal = require('./goal'),
  Stakeholder = require('./stakeholder');


/**********
 * Schema *
 **********/
const Role = `
  type Role {
    id: ID!
    title: String!
    clarifyingStatements: String!
    stakeholders: [Stakeholder]
    goals: [Goal]
  }
`;


module.exports = () => [Role, Goal, Stakeholder];
