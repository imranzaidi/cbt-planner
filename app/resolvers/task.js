module.exports = {
  Task: {
    notes: ({ id }, args, { models }) => models.note.findAll({ where: { taskID: id } })
  },

  Query: {
    getTask: ({ id }, args, { models }) => models.task.findOne({ where: { id } })
  },

  Mutation: {
    createTask: (parent, args, { models }) => models.task.create(args),
    updateTask: ({ id }, { description, status, priority }, { models }) => models.task.update({
      description, status, priority
    }, { where: { id } }),
    deleteTask: ({ id }, args, { models }) => models.task.destroy({ where: { id } })
  }
};
