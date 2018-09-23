/***********************
 * Module Dependencies *
 ***********************/
const _ = require('lodash'),
  Sequelize = require('sequelize'),
  { safeUserProperties } = require('../consts/user');


module.exports = {
  TaskList: {
    tasks: ({ id }, args, { models }) => { // eslint-disable-line arrow-body-style
      return models.TaskList.find({ where: { id } })
        .then(taskList => taskList.getTasks());
    },
    user: ({ id }, args, { models }) => { // eslint-disable-line arrow-body-style
      return models.TaskList.find({ where: { id } })
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

      // TODO: add validation for startDate on monthly & weekly basis
      return models.TaskList.create({ startDate: date, type, user_id: user.id });
    },
    addTaskToTaskList: async (parent, { taskId, taskListId }, { models }) => {
      const task = await models.Task.find({ where: { id: taskId } });
      if (!task) return null;

      const taskList = await models.TaskList.find({ where: { id: taskListId } });
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
      if (!tasks) return null;

      const taskList = await models.TaskList.find({ where: { id: taskListId } });
      if (!taskList) return null;

      await taskList.addTasks(tasks);
      return taskList;
    },
    deleteTaskList: (parent, { id }, { models }) => models.TaskList.destroy({ where: { id } })
  }
};
