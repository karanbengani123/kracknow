'use strict'

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('wallet_transactions', {
      uuid: {
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID,
      },
      examType: {
        type: DataTypes.ENUM("EXAM", "QUIZ", "MOCK_TEST", "TOURNAMENT")
      },
      examTitle: {
        type: DataTypes.STRING
      },
      examUUID: {
        type: DataTypes.UUID,
      },
      tournamentUUID: {
        type: DataTypes.UUID,
      },
      walletUUID: {
        allowNull: false,
        type: DataTypes.UUID,
      },

      type: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      amount: {
        allowNull: false,
        type: DataTypes.DOUBLE,
      },

      status: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      statusMsg: {
        type: DataTypes.STRING,
      },
      paymentMode: {
        type: DataTypes.STRING,
      },
      orderId: {
        type: DataTypes.STRING,
      },
      referenceId: {
        type: DataTypes.STRING,
      },
      paymentDate: {
        type: DataTypes.DATE,
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
    return queryInterface.dropTable('wallet_transactions')
  }
}
