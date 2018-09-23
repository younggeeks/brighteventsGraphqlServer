'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Events', //name of the source model
      'userId',
      {
        type:Sequelize.INTEGER,
        references:{
          model:'Users', //name of the target model
          key:'id' //key in target model 
        },
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Events','userId')
  }
};
