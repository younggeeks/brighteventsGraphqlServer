module.exports = {
  Query: {
    getCategories: async (_, args, { models }) => models.Category.findAll({ include: [{ model: models.Event, as: 'events' }] }),
  },
};
