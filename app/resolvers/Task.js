/***********************
 * Module Dependencies *
 ***********************/
const _ = require('lodash'),
  Sequelize = require('sequelize'),
  { safeUserProperties } = require('../consts/user');


module.exports = {
  Task: {
    notes: ({ id }, args, { models }) => models.Note.findAll({ where: { task_id: id } }),
    user: ({ id }, args, { models }) => models.Task.findOne({
      where: { id }
    }).then(async (task) => {
      const user = await task.getUser();
      const safeReturnValue = _.pick(user, safeUserProperties);
      safeReturnValue.password = null;

      return safeReturnValue;
    })
  },

  Query: {
    getTask: (parent, { id }, { models, user }) => models.Task.findOne({
      where: { id, user_id: user.id }
    }),
    getTasksDueBy: (parent, { date }, { models, user }) => {
      // TODO: add start range to params or modify with a less arbitrary lower bound
      const currentDate = new Date(),
        dueDate = new Date(date);

      return models.Task.findAll({
        where: {
          due: { [Sequelize.Op.between]: [currentDate, dueDate] },
          user_id: user.id
        }
      });
    },
    getIncompleteTasks: (parent, args, { models, user }) => models.Task.findAll({
      where: {
        user_id: user.id,
        status: { [Sequelize.Op.or]: ['incomplete', 'in progress', 'forwarded'] }
      }
    }),
    getTasksWithoutDueDates: (parent, args, { models, user }) => models.Task.findAll({
      where: {
        user_id: user.id,
        due: null
      }
    }),
    getForwardedTasks: (parent, args, { models, user }) => models.Task.findAll({
      where: {
        user_id: user.id,
        status: 'forwarded'
      }
    })
  },

  Mutation: {
    createTask: (parent, { description, priority, due, status }, { models, user }) => {
      const properties = { description, priority, due, status };

      Object.keys(properties).forEach((key) => {
        if (!properties[key]) delete properties[key];
      });
      properties.user_id = user.id;

      return models.Task.create(properties);
    },
    updateTask: async (parent, { id, description, status, priority, due }, { models }) => {
      const updates = { description, status, priority, due };

      Object.keys(updates).forEach((key) => {
        if (!updates[key]) {
          delete updates[key];
        }
      });

      if (Object.keys(updates).length === 0) return null;

      const task = await models.Task.findOne({ where: { id } });
      await task.update(updates);

      return task;
    },
    deleteTask: (parent, { id }, { models }) => models.Task.destroy({ where: { id } })
  }
};
