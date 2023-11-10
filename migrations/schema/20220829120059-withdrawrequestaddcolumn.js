'use strict'

module.exports = {
  up: (queryInterface, DataTypes) => {
    return Promise.all([
      queryInterface.addColumn('withdrawal_request', 'transferId', {
        type: DataTypes.STRING(100)
      }),
      queryInterface.addColumn('withdrawal_request', 'transferMode', {
        allowNull: false,
        type: DataTypes.ENUM('upi', 'paytm')
      }),
      queryInterface.addColumn('withdrawal_request', 'remarks', {
        type: DataTypes.STRING(100)
      }),
      queryInterface.addColumn('withdrawal_request', 'action', {
        type: DataTypes.ENUM('PENDING', 'COMPLETED', 'ACCEPTED')
      })
    ])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
}
