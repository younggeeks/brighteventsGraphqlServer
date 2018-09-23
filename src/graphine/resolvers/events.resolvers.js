const { UserInputError, AuthenticationError } = require('apollo-server');
const pubsub = require('./../subscription');
const { EVENTS } = require('../subscription');


module.exports = {
  Query: {
    getAllEvents: (_, args, { models }) => models.Event.findAll({ paranoid: true, include: [{ model: models.User, as: 'user' }] }),
    getMyEvents: (_, args, { models, user }) => models.Event.findAll({ where: { userId: user.id }, include: [{ model: models.Tag, as: 'tags' }] }),
    getSingleEvent: async (_, { id }, { models, user }) => {
      const event = await models.Event.findById(id);
      if (!event) {
        throw new UserInputError(`User with ID ${id} is not found`);
      }
      if (user.id === event.userId) {
        return models.Event.findById(id, { include: [{ model: models.User, as: 'user' }, { model: models.User, as: 'users' }, { model: models.Tag, as: 'tags' }] });
      }
      return models.Event.findById(id, { include: [{ model: models.User, as: 'user' }, { model: models.Tag, as: 'tags' }] });
    },
  },
  Mutation: {
    createEvent: async (_, {
      name, address, start, category, tags, end,
    }, { models, user }) => {
      let newCat = await models.Category.findOne({ where: { name: category } });
      let categoryId;
      if (newCat) {
        categoryId = newCat.id;
      }
      newCat = await models.Category.create({ name: category });
      if (!user) {
        throw new AuthenticationError('You need to login to be able to create an event');
      }
      const startDate = Number(start);
      const endDate = Number(end);
      const userId = user.id;
      console.log('the user is ', userId);
      const newEvent = await models.Event.create({
        name, address, start: startDate, end: endDate, userId, categoryId,
      });
      tags.map((tagId) => {
        models.EventTags.create({ eventId: newEvent.id, tagId });
      });
      pubsub.publish(EVENTS.EVENT.CREATED, {
        eventCreated: { newEvent },
      });
      return newEvent.get({ plain: true });
    },

    updateEvent: async (_, {
      id, name, address, start, category, tags, end,
    }, { models, user }) => {
      const event = await models.Event.findById(id);
      if (!event) {
        throw new UserInputError(`Event with ID ${id} is not found`);
      }
      if (user.id !== event.userId) {
        throw new UserInputError('You can only update events you created');
      }

      if (name) {
        event.name = name;
      }
      if (address) {
        event.address = address;
      }
      if (start) {
        event.start = start;
      }
      if (category) {
        event.categoryId = category;
      }
      if (end) {
        event.end = end;
      }
      event.save();
      return event;
    },
    deleteEvent: async (_, { id, forever }, { models, user }) => {
      const event = await models.Event.findById(id);
      if (!event) {
        throw new UserInputError(`Event with ID ${id} is not found`);
      }
      if (user.id !== event.userId) {
        throw new UserInputError('You can only delete events you created');
      }
      const del = await models.Event.destroy({ where: { id }, paranoid: true });
      if (del) {
        return true;
      }
      return false;
    },
  },
  Subscription: {
    eventCreated: {
      subscribe: () => pubsub.asyncIterator(EVENTS.EVENT.CREATED),
    },
  },
};
