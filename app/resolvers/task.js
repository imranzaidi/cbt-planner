module.exports = {
  Query: {
    getTask: ({ id }, args, { models }) =>
      models.Task.findOne({
        where: { id }
      })
  },

  Mutation: {
    createTask: (parent, args, { models }) => models.Task.create(args)
  }
};
