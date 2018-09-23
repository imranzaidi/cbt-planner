/***********************
 * Module Dependencies *
 ***********************/
const _ = require('lodash'),
  bcrypt = require('bcrypt');


module.exports = {
  Query: {
    getUser: (parent, args, { models, user }) => { // eslint-disable-line arrow-body-style
      return models.User.findOne({ where: { id: user.id } }).then((fetchedUser) => {
        const returnValue = _.pick(fetchedUser, ['id', 'username', 'email', 'createdAt', 'updatedAt']);
        returnValue.password = null;
        return returnValue;
      });
    }
  },

  Mutation: {
    updateUser: async (parent, { newUsername, newEmail, newPassword }, { models, user }) => {
      const fetchedUser = await models.User.find({ where: { id: user.id } });

      if (newPassword) {
        fetchedUser.password = await bcrypt.hash(newPassword, 12);
      }
      if (newUsername) {
        fetchedUser.username = newUsername;
      }
      if (newEmail) {
        fetchedUser.email = newEmail;
      }

      let returnValue;
      if (newPassword || newUsername || newEmail) {
        const updatedUser = await fetchedUser.update(fetchedUser, { where: { id: fetchedUser.id } });
        returnValue = _.pick(updatedUser, ['id', 'username', 'email', 'createdAt', 'updatedAt']);
        returnValue.password = null;
        return returnValue;
      }

      returnValue = _.pick(fetchedUser, ['id', 'username', 'email', 'createdAt', 'updatedAt']);
      returnValue.password = null;
      return returnValue;
    }
  }
};
