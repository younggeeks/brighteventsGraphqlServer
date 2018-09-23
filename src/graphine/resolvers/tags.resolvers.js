const { UserInputError } = require('apollo-server');
module.exports = {
  Query: {
    getTag: async (_, { id }, { models }) => {
      const tag = await models.Tag.findById(id, { include: [{ model: models.Event, as: 'events' }] });
      if (!tag) {
        throw new UserInputError(`Tag with ID ${id} is not found `);
      }
      return tag;
    }
    ,
  },
  Mutation: {
    createTag: async (_, { name }, { models }) => {
      let tag = await models.Tag.findOne({ where: { name } });
      if (tag) {
        return tag;
      }
      tag = await models.Tag.create({ name });
      return tag.get({ plain: true });
    },
  },
};
