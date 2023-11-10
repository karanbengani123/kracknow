'use strict'
module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('reset_password_tokens', {
      token: {
        allowNull: false,
        type: DataTypes.STRING
      },
      tokenExpiryTime: {
        allowNull: false,
        type: DataTypes.DATE
      },
      user: {
        type: DataTypes.UUID
      },
      uuid: {
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID
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
  down: (queryInterface) => {
    return queryInterface.dropTable('reset_password_tokens')
  }
}
