'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable("tournament_ranking_factor", {
      uuid: {
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID,
      },

      tournamentUUID: {
        allowNull: false,
        type: DataTypes.UUID,
      },

      type: {
        allowNull: false,
        type: DataTypes.ENUM(
          "ON_CORRECT_ANSWER",
          "ON_INCORRECT_ANSWER",
          "TIME_LIMIT",
          "PRIMARY",
          "SECONDARY"
        ),
      },

      title: {
        allowNull: false,
        type: DataTypes.STRING,
      },

      time: {
        type: DataTypes.INTEGER,
      },

      points: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      coins: {
        type: DataTypes.INTEGER,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("tournament_ranking_factor");
  },
};
