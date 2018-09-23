

module.exports = (sequelize, DataTypes) => {
  const Rsvp = sequelize.define('Rsvp', {
    userId: DataTypes.INTEGER,
    eventId: DataTypes.INTEGER,
    favorite: DataTypes.BOOLEAN,
  }, {});
  Rsvp.associate = function (models) {
    // associations can be defined here
  };
  return Rsvp;
};
