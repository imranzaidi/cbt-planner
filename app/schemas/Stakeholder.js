/***********************
 * Module Dependencies *
 ***********************/
const Role = require('./Role');


/**********
 * Schema *
 **********/
const Stakeholder = `
  type Stakeholder {
    id: Int!
    title: String!
    roles: [Role]
  }
`;


module.exports = () => [Stakeholder, Role];
