

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
    'Events', // name of the source model
    'categoryId',
    {
      type: Sequelize.INTEGER,
      references: {
        model: 'Categories', // name of the target model
        key: 'id', // key in target model
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
  ),

  down: (queryInterface, Sequelize) => queryInterface.removeColumn('Events', 'categoryId'),
};
