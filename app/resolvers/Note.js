module.exports = {
  Note: {
    task: ({ taskId }, arg, { models }) => models.Task.findOne({ where: { id: taskId } })
  },

  Query: {
    getNote: (parent, { id }, { models }) => models.Note.findOne({ where: { id } })
  },

  Mutation: {
    createNote: (parent, { taskId, content }, { models }) => models.Note.create({ task_id: taskId, content }),
    updateNote: (parent, { id, content }, { models }) => models.Note.update({ content }, { where: { id } }),
    deleteNote: (parent, { id }, { models }) => models.Note.destroy({ where: { id } })
  }
};
