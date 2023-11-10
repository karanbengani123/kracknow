'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('category', 'icon', {
          type: Sequelize.DataTypes.STRING
        }, { transaction: t }),
        queryInterface.addColumn('category', 'status', {
          type: Sequelize.DataTypes.BOOLEAN
        }, { transaction: t })
      ])
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('category', 'icon', { transaction: t }),
        queryInterface.removeColumn('category', 'status', { transaction: t })
      ])
    })
  }
}
