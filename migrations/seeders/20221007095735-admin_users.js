'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      {
        createdAt: '2022-03-28 17:00:00',
        updatedAt: '2022-03-28 18:20:47',
        name: 'admin_admin',
        email: 'admin_admin@gmail.com',
        isRoot: true,
        status: true,
        password: '447fc355ba8ec23f7e7096d3fcb0e3804e765506efd4cfe6d32fcc20af544db9',
        uuid: '85ab6121-dbb9-411a-a397-9a4f1b9e4078',
        roleUUID: 'b96be139-fb4f-4c97-9d95-b25c9fda9511'
      },
      {
        createdAt: '2022-03-28 17:00:00',
        updatedAt: '2022-03-28 18:20:47',
        name: 'admin_exam',
        email: 'admin_exam@gmail.com',
        isRoot: true,
        status: true,
        password: '447fc355ba8ec23f7e7096d3fcb0e3804e765506efd4cfe6d32fcc20af544db9',
        uuid: '85ab6121-dbb9-411a-a397-9a4f1b9e4077',
        roleUUID: 'b96be139-fb4f-4c97-9d95-b25c9fda9512'
      },
      {
        createdAt: '2022-03-28 17:00:00',
        updatedAt: '2022-03-28 18:20:47',
        name: 'admin_question',
        email: 'admin_question@gmail.com',
        isRoot: true,
        status: true,
        password: '447fc355ba8ec23f7e7096d3fcb0e3804e765506efd4cfe6d32fcc20af544db9',
        uuid: '85ab6121-dbb9-411a-a397-9a4f1b9e4088',
        roleUUID: 'b96be139-fb4f-4c97-9d95-b25c9fda9531'
      }], {})
  },

  down: (queryInterface, DataTypes) => {
    // return queryInterface.bulkDelete('users',
    //   null
    //   , {})
  }
}
