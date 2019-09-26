/***********************
 * Module Dependencies *
 ***********************/
const _ = require('lodash'),
  Sequelize = require('sequelize'),
  dateUtilities = require('../libraries/dateUtilities'),
  { safeUserProperties } = require('../consts/user');


module.exports = {
  TaskList: {
    tasks: ({ id }, args, { models }) => { // eslint-disable-line arrow-body-style
      return models.TaskList.findOne({ where: { id } })
        .then(taskList => taskList.getTasks());
    },
    user: ({ id }, args, { models }) => { // eslint-disable-line arrow-body-style
      return models.TaskList.findOne({ where: { id } })
        .then(async (taskList) => {
          const user = await taskList.getUser();
          const safeReturnValue = _.pick(user, safeUserProperties);
          safeUserProperties.password = null;

          return safeReturnValue;
        });
    }
  },

  Query: {
    getTaskListById: (parent, { id }, { models, user }) => models.TaskList.findOne({
      where: { id, user_id: user.id }
    }),
    getTaskLists: (parent, args, { models, user }) => models.TaskList.findAll({
      where: { user_id: user.id }
    })
  },

  Mutation: {
    createTaskList: (parent, { startDate, type }, { models, user }) => {
      const date = startDate ? new Date(startDate) : new Date();
      const dateIsMonday = dateUtilities.isBeginningOfMonth(date);
      const dateIsFirstOfMonth = dateUtilities.isBeginningOfWeek(date);
      const validDate = dateIsMonday || dateIsFirstOfMonth;

      if (!startDate && !validDate) {
        throw new Error('Please provide a valid date (Monday or 1st of the month)!');
      }
      if (!validDate) {
        throw new Error('Provided date is not the beginning of the week or month!');
      }

      return models.TaskList.create({ startDate: date, type, user_id: user.id });
    },
    addTaskToTaskList: async (parent, { taskId, taskListId }, { models }) => {
      const task = await models.Task.findOne({ where: { id: taskId } });
      if (!task) return null;

      const taskList = await models.TaskList.findOne({ where: { id: taskListId } });
      if (!taskList) return null;

      await taskList.addTask(task);
      return taskList;
    },
    addTasksToTaskList: async (parent, { taskIds, taskListId }, { models, user }) => {
      const tasks = await models.Task.findAll({
        where:
          {
            [Sequelize.Op.or]: taskIds.map(taskId => ({ id: taskId })),
            user_id: user.id
          }
      });

      if (!tasks || tasks.length === 0) return null;

      const taskList = await models.TaskList.findOne({ where: { id: taskListId } });
      if (!taskList) return null;

      await taskList.addTasks(tasks);
      return taskList;
    },
    deleteTaskList: (parent, { id }, { models }) => models.TaskList.destroy({ where: { id } })
  }
};
