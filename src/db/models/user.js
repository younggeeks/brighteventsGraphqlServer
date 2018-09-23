

const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    fullName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {});
  User.associate = function (models) {
    User.hasMany(models.Event, { as: 'events', foreignKey: 'userId', foreignKeyConstraint: true });
    User.belongsToMany(models.Event, { through: 'Rsvp', as: 'attending', foreignKey: 'userId' });
  };
  User.prototype.hashPassword = async (password) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  };
  User.prototype.comparePasswords = async function (password) {
    return await bcrypt.compare(password, this.password);
  };
  User.beforeCreate(async (user) => {
    const password = await user.hashPassword(user.password);
    user.password = password;
  });

  return User;
};
