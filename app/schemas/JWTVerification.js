module.exports = () => [JWTVerification, User]; // eslint-disable-line no-use-before-define


/***********************
 * Module Dependencies *
 ***********************/
const User = require('./User');


/**********
 * Schema *
 **********/
const JWTVerification = `
  type JWTVerification {
    user: User
    iat: Int
    exp: Int
  }
`;
