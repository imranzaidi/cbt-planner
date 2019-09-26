/***********************
 * Module Dependencies *
 ***********************/
const _ = require('lodash'),
  bcrypt = require('bcrypt'),
  { safeUserProperties } = require('../consts/user');


module.exports = {
  Query: {
    getUser: (parent, args, { models, user }) => { // eslint-disable-line arrow-body-style
      return models.User.findOne({ where: { id: user.id } })
        .then((fetchedUser) => {
          const safeReturnValue = _.pick(fetchedUser, safeUserProperties);
          safeReturnValue.password = null;
          return safeReturnValue;
        });
    }
  },

  Mutation: {
    updateUser: async (parent, { newUsername, newEmail, newPassword }, { models, user }) => {
      const fetchedUser = await models.User.findOne({ where: { id: user.id } });

      const updates = {};
      if (newPassword) {
        updates.password = await bcrypt.hash(newPassword, 12);
      }
      if (newUsername) {
        updates.username = newUsername;
      }
      if (newEmail) {
        updates.email = newEmail;
      }

      let safeReturnValue;
      if (newPassword || newUsername || newEmail) {
        await fetchedUser.update(updates);
        safeReturnValue = _.pick(fetchedUser, safeUserProperties);
        safeReturnValue.password = null;
        return safeReturnValue;
      }

      safeReturnValue = _.pick(fetchedUser, safeUserProperties);
      safeReturnValue.password = null;
      return safeReturnValue;
    }
  }
};
