/***********************
 * Module Dependencies *
 ***********************/
const _ = require('lodash'),
  { safeUserProperties } = require('../consts/user');


module.exports = {
  Task: {
    notes: ({ id }, args, { models }) => models.Note.findAll({ where: { task_id: id } }),
    user: ({ id }, args, { models }) => models.Task.findOne({
      where: { id }
    }).then(async (task) => {
      const user = await task.getUser();
      const safeReturnValue = _.pick(user, safeUserProperties);
      safeUserProperties.password = null;

      return safeReturnValue;
    })
  },

  Query: {
    getTask: (parent, { id }, { models, user }) => models.Task.findOne({
      where: { id, user_id: user.id }
    }),
    getTasksDueBy: (parent, { date }, { models, user }) => {
      const currentDate = new Date(),
        dueDate = new Date(date);

      return models.Task.findAll({
        where: {
          due: { $between: [currentDate, dueDate] },
          user_id: user.id
        }
      });
    }
  },

  Mutation: {
    createTask: (parent, { description }, { models, user }) => models.Task.create({
      description,
      user_id: user.id
    }),
    updateTask: async (parent, { id, description, status, priority, due }, { models, user }) => {
      const updates = { description, status, priority, due, user_id: user.id };

      Object.keys(updates).forEach((key) => {
        if (!updates[key]) {
          delete updates[key];
        }
      });

      const task = await models.Task.findOne({ where: { id } });
      await task.update(updates);

      return task;
    },
    deleteTask: (parent, { id }, { models }) => models.Task.destroy({ where: { id } })
  }
};
