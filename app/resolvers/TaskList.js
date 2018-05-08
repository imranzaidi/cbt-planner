module.exports = {
  TaskList: {
    tasks: ({ id }, args, { models }) => {
      // TODO: refactor and fix

      return models.TaskList.find({ where: { id } })
        .then(taskList => taskList.getTasks());
    }
  },

  Query: {
    getTaskList: (parent, { id }, { models }) => models.TaskList.findOne({ where: { id } })
  },

  Mutation: {
    createTaskList: (parent, { startDate, type }, { models }) => {
      const date = new Date(startDate);

      // TODO: add validation for startDate on monthly & weekly basis
      return models.TaskList.create({ startDate: date, type });
    },
    addToTaskList: (parent, { taskId, taskListId }, { models }) => {
      models.Task.find({ where: { id: taskId } }).then((task) => {
        models.TaskList.find({ where: { id: taskListId } }).then((taskList) => {
          return taskList.addTask(task);
        });
      });
    },
    deleteTaskList: (parent, { id }, { models }) => models.TaskList.destroy({ where: { id } })
  }
};
