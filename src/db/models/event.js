

module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    start: DataTypes.DATE,
    end: DataTypes.DATE,
  }, {});
  Event.associate = function (models) {
    Event.belongsTo(models.Category, { as: 'category' });
    Event.belongsTo(models.User, { as: 'user', foreignKey: 'userId', foreignKeyConstraint: true });
    Event.belongsToMany(models.Tag, {
      through: 'EventTags', as: 'tags', foreignKey: 'eventId', foreignKeyConstraint: true,
    });
    Event.belongsToMany(models.User, {
 through: 'Rsvp', as: 'users', foreignKey: 'eventId', foreignKeyConstraint: true 
});
  };
  return Event;
};
