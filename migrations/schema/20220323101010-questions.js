'use strict'

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('questions', {
      uuid: {
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID

      },

      categoryUUID: {
        allowNull: false,
        type: DataTypes.UUID
      },

      subCategoryUUID: {
        allowNull: false,
        type: DataTypes.UUID
      },

      title: {
        allowNull: false,
        type: DataTypes.TEXT
      },

      description: {
        allowNull: true,
        type: DataTypes.STRING(1000)
      },

      appearedExamCount: {
        allowNull: true,
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
    return queryInterface.dropTable('questions')
  }
}
