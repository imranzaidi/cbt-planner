module.exports = () => [Role, Goal, Stakeholder]; // eslint-disable-line no-use-before-define


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
    clarifying_statements: String!
    stakeholders: [Stakeholder]
    goals: [Goal]
  }
`;
