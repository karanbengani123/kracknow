'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('tournament_scheduled_exam', {
      uuid: {
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID,
      },
      tournamentScheduleUUID: {
        allowNull: false,
        type: DataTypes.UUID,
      },
      tournamentExamScheduleUUID: {
        allowNull: false,
        type: DataTypes.UUID,
      },
      examUUID: {
        allowNull: false,
        type: DataTypes.UUID,
      },

      startTime: {
        type: DataTypes.DATE,
      },

      endTime: {
        type: DataTypes.DATE,
      },
      status: {
        type: DataTypes.ENUM("SCHEDULED", "COMPLETED"),
      },
      examTime: {
        type: DataTypes.ENUM("FULL_DAY", "BASED_ON_TIME"),
        allowNull: false,
        defaultValue: "BASED_ON_TIME",
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      deletedAt: {
        allowNull: true,
        type: DataTypes.DATE,
      },
});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('"tournament_scheduled_exam"');
  }
};
