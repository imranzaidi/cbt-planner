module.exports = {
  Note: {
    task: ({ taskId }, arg, { models }) => models.Task.findOne({ where: { id: taskId } })
  },

  Query: {
    getNote: (parent, { id }, { models }) => models.Note.findOne({ where: { id } })
  },

  Mutation: {
    createNote: (parent, args, { models }) => models.Note.create(args),
    updateNote: (parent, { id, content }, { models }) => models.Note.update({ content }, { where: { id } }),
    deleteNote: (parent, { id }, { models }) => models.Note.destroy({ where: { id } })
  }
};
