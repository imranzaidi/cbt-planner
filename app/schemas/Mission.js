module.exports = () => [Mission, Goal]; // eslint-disable-line no-use-before-define


/***********************
 * Module Dependencies *
 ***********************/
const Goal = require('./Goal');


/**********
 * Schema *
 **********/
const Mission = `
  type Mission {
    id: Int!
    statement: String!
    accomplished: Boolean!
    goals: [Goal]
  }
`;
