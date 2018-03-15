module.exports = {
  Task: {
    notes: ({ id }, args, { models }) => models.Note.findAll({ where: { taskId: id } })
  },

  Query: {
    getTask: ({ id }, args, { models }) => models.Task.findOne({ where: { id } })
  },

  Mutation: {
    createTask: (parent, args, { models }) => models.Task.create(args),
    updateTask: ({ id }, { description, status, priority }, { models }) => models.Task.update({
      description, status, priority
    }, { where: { id } }),
    deleteTask: ({ id }, args, { models }) => models.Task.destroy({ where: { id } })
  }
};
