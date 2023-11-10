'use strict'

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('withdrawal_request', {
      uuid: {
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID,
      },

      studentUUID: {
        allowNull: false,
        type: DataTypes.UUID,
      },

      amount: {
        allowNull: false,
        type: DataTypes.DOUBLE,
      },
      status: {
        allowNull: false,
        type: DataTypes.ENUM("PENDING", "COMPLETED"),
      },
      statusMsg: {
        type: DataTypes.STRING,
      },
      transferId: {
        type: DataTypes.STRING(100),
      },
      upiID: {
        type: DataTypes.STRING(50),
      },
      transferMode: {
        allowNull: false,
        type: DataTypes.ENUM("upi", "paytm", "bank"),
      },
      remarks: {
        type: DataTypes.STRING(100),
      },
      bankName: {
        type: DataTypes.STRING(50),
      },
      accountHolder: {
        type: DataTypes.STRING(50),
      },
      accountNumber: {
        type: DataTypes.STRING(50),
      },
      IFSCCode: {
        type: DataTypes.STRING(50),
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
    return queryInterface.dropTable('withdrawal_request')
  }
}
