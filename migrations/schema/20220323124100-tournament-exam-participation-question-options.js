'use strict'

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('tournament_exam_participation_question_options', {
      uuid: {
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID
      },

      tournamentExamParticipationQuestionUUID: {
        allowNull: false,
        type: DataTypes.UUID
      },

      key: {
        allowNull: false,
        type: DataTypes.STRING
      },

      image: {
        allowNull: true,
        type: DataTypes.STRING
      },
      text: {
        allowNull: false,
        type: DataTypes.STRING
      },
      correctAnswer: {
        allowNull: false,
        type: DataTypes.STRING
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

    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('tournament_exam_participation_question_options')
  }
}
