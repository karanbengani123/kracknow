'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {

    return queryInterface.createTable('tournament_price_distribution', {
      uuid: {
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID,
      },

      tournamentScheduleUUID: {
        allowNull: false,
        type: DataTypes.UUID,
      },

      studentUUID: {
        allowNull: false,
        type: DataTypes.UUID,
      },

      amount: {
        allowNull: false,
        type: DataTypes.DOUBLE,
      },

      rank: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },

      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },

      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },

      deletedAt: {
        type: DataTypes.DATE,
      }
    });

  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.dropTable('tournament_price_distribution');

  }
};
