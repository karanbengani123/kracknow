"use strict";

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable("tournament_schedule", {
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
      startTime: {
        type: DataTypes.DATE,
      },
      endTime: {
        type: DataTypes.DATE,
      },
      joined: {
        type: DataTypes.INTEGER,
      },
      completed: {
        type: DataTypes.INTEGER,
      },
      status: {
        type: DataTypes.ENUM("SCHEDULED", "COMPLETED"),
      },
      tournamentTime: {
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
    return queryInterface.dropTable("tournament_schedule");
  },
};
