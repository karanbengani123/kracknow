'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   
      return queryInterface.bulkInsert('roles', [{
        uuid:'aa22ccb3-aa21-45ad-a362-968393fe4fed',
        roleName: 'SUPER_ADMIN'        
      },
      {
        uuid:'b96be139-fb4f-4c97-9d95-b25c9fda9511',
        roleName: 'ADMIN'        
      },
      {
        uuid:'b96be139-fb4f-4c97-9d95-b25c9fda9512',
        roleName: 'EXAM_CREATOR'        
      },
      {
        uuid:'b96be139-fb4f-4c97-9d95-b25c9fda9531',
        roleName: 'QUESTION_CREATOR'        
      }], {});   
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
