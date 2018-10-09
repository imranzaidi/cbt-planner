module.exports = () => [User]; // eslint-disable-line no-use-before-define


/**********
 * Schema *
 **********/
const User = `
  type User {
    id: Int!
    username: String
    email: String!
    password: String
    createdAt: String!
    updatedAt: String!
  }
`;
