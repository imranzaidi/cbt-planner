module.exports = {
  Query: {
    getNote: ({ id }, args, { models }) => models.Note.findOne({ where: { id } })
  },

  Mutation: {
    createNote: (parent, args, { models }) => models.Note.create(args),
    updateNote: ({ id }, { content }, { models }) => models.Note.update({ content }, { where: { id } }),
    deleteNote: ({ id }, args, { models }) => models.Note.destroy({ where: { id } })
  }
};
