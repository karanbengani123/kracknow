'use strict'

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('exams', {
      uuid: {
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID
      },

      identifier: {
        allowNull: false,
        type: DataTypes.STRING(50)

      },

      title: {
        allowNull: false,
        type: DataTypes.STRING
      },

      categoryUUID: {
        allowNull: false,
        type: DataTypes.UUID
      },

      description: {
        type: DataTypes.STRING(500)
      },

      allowPrimarySelection: {
        type: DataTypes.BOOLEAN
      },

      allowSecondarySelection: {
        type: DataTypes.BOOLEAN
      },

      isFeatured: {
        type: DataTypes.ENUM('YES', 'NO')
      },

      marksPerQuestion: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      status: {
        type: DataTypes.ENUM('ACTIVE', 'SCHEDULED', 'COMPLETED')
      },
      studentLimit: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      isFree: {
        type: DataTypes.BOOLEAN
      },
      joinFee: {
        type: DataTypes.DOUBLE
      },
      projectedTotalWinningPrice: {
        type: DataTypes.DOUBLE
      },
      realizedTotalWinningPrice: {
        type: DataTypes.DOUBLE
      },
      type: {
        allowNull: false,
        type: DataTypes.ENUM('EXAM', 'QUIZ', 'MOCK_TEST')
      },
      totalWinningPrize: {
        type: DataTypes.INTEGER
      },
      timePerQuestion: {
        type: DataTypes.INTEGER
      },
      totalQuestions: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      joinDelay: {
        allowNull: false,
        type: DataTypes.INTEGER
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
    return queryInterface.dropTable('exams')
  }
}
