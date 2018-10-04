/***********************
 * Module Dependencies *
 ***********************/
const { UserInputError } = require('apollo-server-express'),
  _ = require('lodash'),
  bcrypt = require('bcrypt'),
  jsonwebtoken = require('jsonwebtoken'),
  validator = require('validator');


module.exports = {
  Query: {
    purpose: () => 'Login / Register'
  },
  Mutation: {
    login: async (parent, { email, password }, { models, SECRET }) => {
      const user = await models.User.findOne({ where: { email } });
      if (!user) {
        throw new Error('No user with that email.');
      }

      const valid = bcrypt.compareSync(password, user.password);
      if (!valid) {
        throw new Error('Incorrect password.');
      }

      const token = jsonwebtoken.sign(
        { user: _.pick(user, ['id', 'username', 'email']) },
        SECRET,
        { expiresIn: '2h' },
      );

      return token;
    },
    register: async (parent, args, { models }) => {
      const user = args;

      if (!validator.isEmail(user.email)) throw new UserInputError('Invalid email!');
      if (!user.password) throw new UserInputError('Password cannot be blank!');
      if (user.password.length < 8) throw new UserInputError('Password must be at least 8 characters long!');

      user.password = await bcrypt.hash(user.password, 12);

      return models.User.create(user).then((createdUser) => {
        const returnValue = _.pick(createdUser, ['id', 'username', 'email', 'createdAt', 'updatedAt']);
        returnValue.password = null;

        return returnValue;
      });
    }
  }
};
