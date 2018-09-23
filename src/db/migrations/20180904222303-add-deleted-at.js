

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('Events', 'deletedAt' , Sequelize.DATE),


  down: (queryInterface, Sequelize) => queryInterface.removeColumn('Events', 'deletedAt'),
};
