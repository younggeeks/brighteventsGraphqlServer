

module.exports = (sequelize, DataTypes) => {
  const EventTags = sequelize.define('EventTags', {
    eventId: DataTypes.INTEGER,
    tagId: DataTypes.INTEGER,
  }, {});
  EventTags.associate = function (models) {
    // associations can be defined here
  };
  return EventTags;
};
