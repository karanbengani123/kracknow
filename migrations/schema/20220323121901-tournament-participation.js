'use strict'

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('tournament_participation', {
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

      studentUUID: {
        allowNull: false,
        type: DataTypes.UUID
      },

      status: {
        allowNull: false,
        type: DataTypes.BOOLEAN
      },

      marks: {
        allowNull: false,
        type: DataTypes.INTEGER
      },

      completedTime: {
        allowNull: false,
        type: DataTypes.DATE
      },

      startedTime: {
        allowNull: false,
        type: DataTypes.DATE
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
    return queryInterface.dropTable('tournament_participation')
  }
}
