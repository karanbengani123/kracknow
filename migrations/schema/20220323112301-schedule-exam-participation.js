'use strict'

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('schedule_exam_participation', {

      uuid: {
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID
      },

      examScheduleUUID: {
        allowNull: false,
        type: DataTypes.UUID
      },

      examUUID: {
        allowNull: false,
        type: DataTypes.UUID
      },

      studentUUID: {
        allowNull: false,
        type: DataTypes.UUID
      },

      status: {
        allowNull: false,
        type: DataTypes.ENUM('COMPLETED', 'NOT_COMPLETED')
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
    return queryInterface.dropTable('schedule_exam_participation')
  }
}
