'use strict'

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('tournament_prize_ratio', {
      uuid: {
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID
      },

      tournamentUUID: {
        allowNull: false,
        type: DataTypes.UUID
      },

      fromValue: {
        allowNull: false,
        type: DataTypes.INTEGER
      },

      toValue: {
        allowNull: false,
        type: DataTypes.INTEGER
      },

      amount: {
        allowNull: false,
        type: DataTypes.INTEGER
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
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('tournament_prize_ratio')
  }
}
