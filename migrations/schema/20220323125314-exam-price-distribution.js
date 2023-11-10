'use strict'

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('exam_price_distribution', {
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

      studentUUID: {

        allowNull: false,
        type: DataTypes.UUID
      },

      ammount: {
        allowNull: false,
        type: DataTypes.DOUBLE
      },

      rank: {
        allowNull: false,
        type: DataTypes.INTEGER
      },

      status: {
        allowNull: false,
        type: DataTypes.BOOLEAN
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
    return queryInterface.dropTable('exam_price_distribution')
  }
}
