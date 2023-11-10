'use strict'

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('internationalizations', {
      createdAt: {
        allowNull: false,
        defaultValue: DataTypes.NOW,
        type: DataTypes.DATE
      },
      key: {
        allowNull: false,
        type: DataTypes.TEXT
      },
      locale: {
        allowNull: false,
        type: DataTypes.STRING(10)
      },
      scope: {
        allowNull: false,
        type: DataTypes.STRING(100)
      },
      translation: {
        allowNull: false,
        type: DataTypes.TEXT
      },
      updatedAt: {
        allowNull: false,
        defaultValue: DataTypes.NOW,
        type: DataTypes.DATE
      },
      uuid: {
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID
      },
      deletedAt: {
        allowNull: true,
        type: DataTypes.DATE
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('internationalizations')
  }
}
