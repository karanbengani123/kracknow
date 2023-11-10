'use strict'

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('tournament_exams', {
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

      examUUID: {
        allowNull: false,
        type: DataTypes.UUID
      },

      startTime: {
        allowNull: false,
        type: DataTypes.DATE
      },

      endTime: {
        allowNull: false,
        type: DataTypes.DATE
      },

      projectedTotalWinningPrice: {
        type: DataTypes.DOUBLE
      },

      realizedTotalWinningPrice: {
        type: DataTypes.DOUBLE
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
    return queryInterface.dropTable('tournament_exams')
  }
}
