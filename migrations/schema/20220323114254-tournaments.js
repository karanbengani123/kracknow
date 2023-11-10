'use strict'

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('tournaments', {
      uuid: {
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID
      },

      title: {
        allowNull: false,
        type: DataTypes.STRING(100)
      },

      isFree: {
        allowNull: false,
        type: DataTypes.BOOLEAN
      },

      joinFee: {
        allowNull: false,
        type: DataTypes.DOUBLE
      },

      studentLimit: {
        allowNull: false,
        type: DataTypes.INTEGER
      },

      startTime: {
        allowNull: false,
        type: DataTypes.DATE
      },

      endTime: {
        allowNull: false,
        type: DataTypes.DATE
      },

      description: {
        allowNull: false,
        type: DataTypes.STRING(500)
      },

      joined: {
        type: DataTypes.INTEGER
      },

      completed: {
        type: DataTypes.INTEGER
      },

      pending: {
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
    return queryInterface.dropTable('tournaments')
  }
}
