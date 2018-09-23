const { PubSub } = require('apollo-server');
const EVENT_EVENTS = require('./events');

module.exports.EVENTS = {
  EVENT: EVENT_EVENTS,
};

module.exports = new PubSub();
