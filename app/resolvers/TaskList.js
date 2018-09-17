const Sequelize = require('sequelize');

module.exports = {
  TaskList: {
    tasks: ({ id }, args, { models }) => { // eslint-disable-line arrow-body-style
      return models.TaskList.find({ where: { id } })
        .then(taskList => taskList.getTasks());
    }
  },

  Query: {
    getTaskList: (parent, { id }, { models }) => models.TaskList.findOne({ where: { id } })
  },

  Mutation: {
    createTaskList: (parent, { startDate, type }, { models }) => {
      const date = startDate ? new Date(startDate) : new Date();

      // TODO: add validation for startDate on monthly & weekly basis
      return models.TaskList.create({ startDate: date, type });
    },
    addTaskToTaskList: async (parent, { taskId, taskListId }, { models }) => {
      const task = await models.Task.find({ where: { id: taskId } });
      if (!task) return null;

      const taskList = await models.TaskList.find({ where: { id: taskListId } });
      if (!taskList) return null;

      // console.log('taskList (raw):', taskList);
      // console.log('taskList:', JSON.parse(JSON.stringify(taskList, null, 2)));

      await taskList.addTask(task);
      return taskList;
    },
    addTasksToTaskList: async (parent, { taskIds, taskListId }, { models }) => {
      const tasks = await models.Task.findAll({ where:
          { [Sequelize.Op.or]: taskIds.map(taskId => ({ id: taskId })) }
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
