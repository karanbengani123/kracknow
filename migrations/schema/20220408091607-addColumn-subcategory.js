'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('sub_category', 'icon', {
          type: Sequelize.DataTypes.STRING
        }, { transaction: t }),
        queryInterface.addColumn('sub_category', 'status', {
          type: Sequelize.DataTypes.BOOLEAN
        }, { transaction: t })
      ])
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('sub_category', 'icon', { transaction: t }),
        queryInterface.removeColumn('sub_category', 'status', { transaction: t })
      ])
    })
  }
}
