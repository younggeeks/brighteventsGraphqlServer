

module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    name: {
      type: DataTypes.STRING,
      validation: {
        unique: true,
        min: 2,
      },
    },
  }, {});
  Tag.associate = function (models) {
    Tag.belongsToMany(models.Event, {
      through: 'EventTags',
      as: 'events',
foreignKey:
  'tagId',
foreignKeyConstraint: true,
    });
  };
  return Tag;
};
