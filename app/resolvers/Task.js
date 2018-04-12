module.exports = {
  Task: {
    notes: ({ id }, args, { models }) => models.Note.findAll({ where: { taskId: id } })
  },

  Query: {
    getTask: (parent, { id }, { models }) => {
      return models.Task.findOne({ where: { id } });
    },
    getTasksDueBy: (parent, { date }, { models }) => {
      const currentDate = new Date(),
        dueDate = new Date(date);

      return models.Task.findAll({ where: { due: { $between: [currentDate, dueDate] } } });
    }
  },

  Mutation: {
    createTask: (parent, { description }, { models }) => models.Task.create({ description }),
    updateTask: (parent, { id, description, status, priority, due }, { models }) => {
      const updatedFields = { description, status, priority, due };

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
