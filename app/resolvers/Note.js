module.exports = {
  Note: {
    // eslint-disable-next-line camelcase
    task: ({ task_id }, arg, { models }) => models.Task.findOne({ where: { id: task_id } })
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
