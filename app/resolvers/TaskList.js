module.exports = {
  TaskList: {
    tasks: ({ id }, args, { models }) => {
      // TODO: refactor and fix
      return models.Task.findAll({
        include: [{
          model: models.TaskList,
          through: {
            where: { taskListId: id }
          }
        }]
      });
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
    // TODO: implement updateTaskList / addToTaskList
    deleteTaskList: (parent, { id }, { models }) => models.TaskList.destroy({ where: { id } })
  }
};
