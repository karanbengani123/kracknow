'use strict'

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('exam_schedule', {
      uuid: {
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
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

      

      joined: {
        allowNull: false,
        type: DataTypes.INTEGER
      },

      completed: {

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
    return queryInterface.dropTable('exam_schedule')
  }
}
