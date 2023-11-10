'use strict'

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('tournament_exam_participation_questions', {
      uuid: {
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: false,
        type: DataTypes.UUID
      },

      tournamentParticipationExamUUID: {
        allowNull: false,
        type: DataTypes.UUID
      },

      questionUUID: {
        allowNull: false,
        type: DataTypes.UUID
      },

      title: {
        allowNull: false,
        type: DataTypes.STRING(100)
      },

      description: {
        allowNull: false,
        type: DataTypes.STRING(500)
      },

      mark: {
        allowNull: false,
        type: DataTypes.INTEGER
      },

      status: {
        allowNull: false,
        type: DataTypes.ENUM('Active', 'In-Active')
      },

      isCorrect: {
        allowNull: false,
        type: DataTypes.BOOLEAN
      },

      givenAnswer: {
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
    return queryInterface.dropTable('tournament_exam_participation_questions')
  }
}
