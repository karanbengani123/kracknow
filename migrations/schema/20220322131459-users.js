'use strict'

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('users', {
      uuid: {
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID
      },

      name: {
        allowNull: false,
        type: DataTypes.STRING(100)
      },

      email: {
        allowNull: false,
        type: DataTypes.STRING
      },

      password: {
        allowNull: false,
        type: DataTypes.STRING(64)
      },

      roleUUID: {
        allowNull: false,
        type: DataTypes.UUID
      },

      isRoot: {
        allowNull: false,
        type: DataTypes.BOOLEAN
      },

      status: {
        allowNull: false,
        type: DataTypes.BOOLEAN
      },

      profilePic: {
        allowNull: true,
        type: DataTypes.STRING
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
    return queryInterface.dropTable('users')
  }
}
