'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      createdAt: '2022-03-28 17:00:00',
      updatedAt: '2022-03-28 18:20:47',
      name: 'admin',
      email: 'admin@gmail.com',
      isRoot: true,
      status: true,
      password: '447fc355ba8ec23f7e7096d3fcb0e3804e765506efd4cfe6d32fcc20af544db9',
      uuid: '85ab6121-dbb9-411a-a397-9a4f1b9e4077',
      roleUUID: '524c1376-ee2a-11ea-adc1-0242ac120002'
    }], {})
  },

  down: (queryInterface, DataTypes) => {
    return queryInterface.bulkDelete('users', {
      uuid: {
        [DataTypes.Op.in]: [
          '85ab6121-dbb9-411a-a397-9a4f1b9e4077'
        ]
      }
    }, {})
  }
}
