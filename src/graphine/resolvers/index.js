const userResolvers = require('./user.resolvers');
const eventsResolvers = require('./events.resolvers');
const tagsResolvers = require('./tags.resolvers');
const categoriesResolver = require('./categories.resolvers');

module.exports = [userResolvers, eventsResolvers, tagsResolvers, categoriesResolver];
