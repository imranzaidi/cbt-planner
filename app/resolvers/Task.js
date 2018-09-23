module.exports = {
  Task: {
    notes: ({ id }, args, { models }) => models.Note.findAll({ where: { task_id: id } }),
    user: async ({ id }, args, { models }) => {
      const task = await models.Task.findOne({ where: { id } });
      return task.getUser();
    }
  },

  Query: {
    getTask: (parent, { id }, { models }) => models.Task.findOne({ where: { id } }),
    getTasksDueBy: (parent, { date }, { models }) => {
      const currentDate = new Date(),
        dueDate = new Date(date);

      return models.Task.findAll({ where: { due: { $between: [currentDate, dueDate] } } });
    }
  },

  Mutation: {
    createTask: (parent, { description }, { models }) => models.Task.create({ description }),
    updateTask: async (parent, { id, description, status, priority, due }, { models, user }) => {
      const updatedFields = { description, status, priority, due, user_id: user.id };

      Object.keys(updatedFields).forEach((key) => {
        if (!updatedFields[key]) {
          delete updatedFields[key];
        }
      });

      const task = await models.Task.findOne({ where: { id } });
      await task.update(updatedFields, { where: { id } });

      return task;
    },
    deleteTask: (parent, { id }, { models }) => models.Task.destroy({ where: { id } })
  }
};
