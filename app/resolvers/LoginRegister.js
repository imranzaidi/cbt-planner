/***********************
 * Module Dependencies *
 ***********************/
const { UserInputError } = require('apollo-server-express'),
  _ = require('lodash'),
  bcrypt = require('bcrypt'),
  jsonwebtoken = require('jsonwebtoken'),
  validator = require('validator'),
  { errorMessages, errorTypes } = require('../consts/loginRegistration');


module.exports = {
  Query: {
    verifyToken: async (parent, { token }, { req, SECRET }) => { // eslint-disable-line
      const tokenFromAnywhere = token || req.headers.authorization || req.cookies.id;
      try {
        return await jsonwebtoken.verify(tokenFromAnywhere, SECRET);
      } catch (e) {
        return {
          user: null,
          exp: 0,
          iat: 0
        };
      }
    }
  },
  Mutation: {
    login: async (parent, { email, password }, { models, SECRET, res }) => {
      const user = await models.User.findOne({ where: { email } });
      if (!user) {
        const error = new Error(errorMessages.emailLookUp);
        error.name = errorTypes.login;
        throw error;
      }

      const valid = bcrypt.compareSync(password, user.password);
      if (!valid) {
        const error = new Error(errorMessages.incorrectPassword);
        error.name = errorTypes.login;
        throw error;
      }

      const token = jsonwebtoken.sign(
        { user: _.pick(user, ['id', 'username', 'email']) },
        SECRET,
        { expiresIn: '2h' },
      );

      res.cookie('id', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 // 2 hours
      });

      return token;
    },
    register: async (parent, args, { models }) => {
      const user = args;

      if (!validator.isEmail(user.email)) throw new UserInputError(errorMessages.invalidEmail);
      if (!user.password) throw new UserInputError(errorMessages.missingPassword);
      if (user.password.length < 8) throw new UserInputError(errorMessages.invalidPasswordLength);
      const existingUser = await models.User.findOne({ where: { email: user.email } });
      if (existingUser && existingUser.email && validator.isEmail(existingUser.email)) {
        const error = new Error(errorMessages.existingUser);
        error.name = errorTypes.signUp;
        throw error;
      }

      user.password = await bcrypt.hash(user.password, 12);

      return models.User.create(user).then((createdUser) => {
        const returnValue = _.pick(createdUser, ['id', 'username', 'email', 'createdAt', 'updatedAt']);
        returnValue.password = null;

        return returnValue;
      });
    }
  }
};
