/***********************
 * Module Dependencies *
 ***********************/
const Role = require('./Role');


/**********
 * Schema *
 **********/
const Stakeholder = `
  type Stakeholder {
    id: ID!
    title: String!
    roles: [Role]
  }
`;


module.exports = () => [Stakeholder, Role];
