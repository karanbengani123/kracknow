'use strict'

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('students', 
    {
      uuid: {
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID
      },
  
      email: {
        allowNull: false,
        type: DataTypes.STRING(100)
      },
      firstName: {
        allowNull: false,
        type: DataTypes.STRING(100)
      },
  
      lastName: {
        allowNull: false,
        type: DataTypes.STRING(100)
      },
  
      mobileNumber: {
        allowNull: false,
        type: DataTypes.STRING(15)
      },
  
      profilePic: {
        allowNull: true,
        type: DataTypes.STRING
      },
  
      idProof: {
        allowNull: true,
        type: DataTypes.STRING
      },
  
      password: {
        allowNull: false,
        type: DataTypes.STRING(64)
      },
  
      cityUUID: {
        allowNull: false,
        type: DataTypes.UUID
      },
  
      status: {
        allowNull: false,
        type: DataTypes.BOOLEAN
      },
  
      examRegistered: {
        allowNull: true,
        type: DataTypes.INTEGER
      },
      examCompleted: {
        allowNull: true,
        type: DataTypes.INTEGER
      },
      tournamentRegistered: {
        allowNull: true,
        type: DataTypes.INTEGER
      },
  
      tournamentCompleted: {
        allowNull: true,
        type: DataTypes.INTEGER
      },
  
      quizRegistered: {
        allowNull: true,
        type: DataTypes.INTEGER
      },
  
      quizCompleted: {
        allowNull: true,
        type: DataTypes.INTEGER
      },
      isRegistered: {
        type: DataTypes.BOOLEAN
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('students')
  }
}
