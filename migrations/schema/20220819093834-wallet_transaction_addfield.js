'use strict'

module.exports = {
  up: (queryInterface, DataTypes) => {
    return Promise.all([
      queryInterface.addColumn('wallet_transactions', 'paymentMode', {
        type: DataTypes.STRING
      }),

      queryInterface.addColumn('wallet_transactions', 'orderId', {
        type: DataTypes.STRING
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
