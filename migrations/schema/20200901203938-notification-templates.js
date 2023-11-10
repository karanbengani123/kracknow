'use strict'

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('notification_templates', {
      communicationType: {
        allowNull: false,
        type: DataTypes.STRING(20)
      },
      createdAt: {
        allowNull: false,
        defaultValue: DataTypes.NOW,
        type: DataTypes.DATE
      },
      identifier: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING(100)
      },
      locale: {
        allowNull: false,
        type: DataTypes.STRING(2)
      },
      renderer: {
        allowNull: false,
        type: DataTypes.STRING(20)
      },
      subject: {
        allowNull: false,
        type: DataTypes.STRING(250)
      },
      template: {
        allowNull: false,
        type: DataTypes.TEXT
      },
      updatedAt: {
        allowNull: false,
        defaultValue: DataTypes.NOW,
        type: DataTypes.DATE
      },
      deletedAt: {
        allowNull: true,
        type: DataTypes.DATE
      }
    })
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('notification_templates')
  }
}
