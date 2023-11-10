'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {

    return queryInterface.createTable('student_completed_tournament_exams_status', {
      uuid: {
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID,
      },
      examUUID: {
        allowNull: false,
        type: DataTypes.UUID,
      },
      tournamentParticipationUUID: {
        allowNull: false,
        type: DataTypes.UUID,
      },
      completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
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
    });

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('student_completed_tournament_exams_status');

  }
};
