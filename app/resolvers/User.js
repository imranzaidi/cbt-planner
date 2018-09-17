/***********************
 * Module Dependencies *
 ***********************/
const _ = require('lodash'),
  bcrypt = require('bcrypt'),
  jsonwebtoken = require('jsonwebtoken');


module.exports = {
  Query: {
    getUser: (parent, { id }, { models }) => models.User.findOne({ where: { id } })
  },

  Mutation: {
    login: async (parent, { email, password }, { models, SECRET }) => {
      const user = await models.User.findOne({ where: { email } });
      if (!user) {
        throw new Error('No user with that email');
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
      user.password = await bcrypt.hash(user.password, 12);
      return models.User.create(user);
    },
    updateUser: async (parent, { id, newUsername, newEmail, newPassword }, { models }) => {
      const user = await models.User.find({ where: { id } });

      if (newPassword) {
        user.password = await bcrypt.hash(newPassword, 12);
      }
      if (newUsername) {
        user.username = newUsername;
      }
      if (newEmail) {
        user.email = newEmail;
      }

      if (newPassword || newUsername || newEmail) {
        return user.update(user, { where: { id } });
      }
      return user;
    }
  }
};
