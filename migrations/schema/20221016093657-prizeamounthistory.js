'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {

    return queryInterface.createTable('prize_amount_history', {
      uuid: {
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID,
      },
      studentUUID: {
        allowNull: false,
        type: DataTypes.UUID
      },
      examScheduleUUID: {
        type: DataTypes.UUID
      },
      tournamentScheduleUUID: {
        type: DataTypes.UUID
      },
      scheduleExamParticipationUUID: {
        type: DataTypes.UUID
      },
      tournamentParticipationUUID: {
        type: DataTypes.UUID
      },

    },);

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('prize_amount_history');
  }
};
