module.exports = {
  Task: {
    notes: ({ id }, args, { models }) => models.Note.findAll({ where: { taskId: id } })
  },

  Query: {
    getTask: (parent, { id }, { models }) => models.Task.findOne({ where: { id } })
    // TODO: getTasksDueBy
  },

  Mutation: {
    createTask: (parent, { description }, { models }) => models.Task.create({ description }),
    updateTask: (parent, { id, description, status, priority }, { models }) => {
      const updatedFields = { description, status, priority };

      Object.keys(updatedFields).forEach((key) => {
        if (!updatedFields[key]) {
          delete updatedFields[key];
        }
      });

      return models.Task.update(updatedFields, { where: { id } });
    },
    deleteTask: (parent, { id }, { models }) => models.Task.destroy({ where: { id } })
  }
};
