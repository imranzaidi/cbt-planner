module.exports = () => [Stakeholder, Role]; // eslint-disable-line no-use-before-define


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
