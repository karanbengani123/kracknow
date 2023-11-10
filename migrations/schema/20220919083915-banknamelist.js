'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
      return queryInterface.createTable("bank_name_list", {
        bankName: {
          type: DataTypes.STRING(50),
          allowNull: false,
          primaryKey: true,
        },
        createdAt: {
          allowNull: false,
          type: DataTypes.DATE
        },
        updatedAt: {
          allowNull: false,
          type: DataTypes.DATE
        },
        deletedAt: {
          allowNull: true,
          type: DataTypes.DATE
        }
      });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
