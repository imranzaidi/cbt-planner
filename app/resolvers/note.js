module.exports = {
  Query: {
    getNote: ({ id }, args, { models }) => models.note.findOne({ where: { id } })
  },

  Mutation: {
    createNote: (parent, args, { models }) => models.note.create(args),
    updateNote: ({ id }, { content }, { models }) => models.task.update({
      content
    }, { where: { id } }),
    deleteNote: ({ id }, args, { models }) => models.note.destroy({ where: { id } })
  }
};
