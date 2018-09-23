const { UserInputError, AuthenticationError } = require('apollo-server');
const { signToken } = require('../../db/helpers/tokenizer');

module.exports = {
  Query: {
    getProfile: async (_, args, { user }) => {
      if (!user) {
        throw new AuthenticationError(
          'Authentication token is missing, please login again',
        );
      }
      return user;
    },
  },
  Mutation: {
    signup: async (_, { fullName, email, password }, { models }) => {
      let user = await models.User.create({ fullName, email, password });
      user = await user.get({ plain: true });
      return { token: await signToken(user) };
    },

    rsvp: async (_, { eventId }, { models, user }) => {
      const event = await models.Event.findById(eventId, { raw: true });
      if (!event) {
        throw new UserInputError(`Event with ID of ${eventId} is not found`);
      }
      if (event.userId === user.id) {
        throw new UserInputError('You can not rsvp to your own event');
      }
      const alreadySubscribed = await models.Rsvp.findAll({
        where: { eventId, userId: user.id },
      });
      if (alreadySubscribed.length > 0) {
        throw new UserInputError("You've already rsvpd into this event");
      }
      await models.Rsvp.create({ eventId, userId: user.id });
      return await models.Event.findById(eventId, {
        include: [{ model: models.User, as: 'user' }],
      });
    },
    login: async (_, { email, password }, { models }) => {
      let user = await models.User.findOne({ where: { email } });
      if (!user) {
        throw new UserInputError(`User with email ${email} does not exist`);
      }
      const validPassword = await user.comparePasswords(password);
      if (!validPassword) {
        throw new UserInputError('Wrong combination of username and password');
      }
      user = user.get({ plain: true });
      const token = await signToken(user);

      return { token };
    },
  },
};
