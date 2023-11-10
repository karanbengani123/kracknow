'use strict'

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('exam_participation_question_options', {

      uuid: {
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID
      },

      examParticipationQuestionUUID: {
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
    return queryInterface.dropTable('exam_participation_question_options')
  }
}
