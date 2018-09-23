

module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: DataTypes.STRING,
  }, {});
  Category.associate = function (models) {
    Category.hasMany(models.Event, { as: 'events', foreignKey: 'categoryId' });
  };
  return Category;
};
