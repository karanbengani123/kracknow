import { DataTypes, Model, Sequelize } from 'sequelize'
import { makeModelOptions } from '../../helpers/makeModelOptions'

class Student extends Model {
  public uuid: string
  public email: string
  public firstName: string
  public lastName: string
  public mobileNumber: string
  public profilePic: string
  public idProof: string
  public password: string
  public cityUUID: string
  public status: string
  public examRegistered: number
  public examCompleted: number
  public tournamentRegistered: number
  public tournamentCompleted: number
  public quizRegistered: number
  public quizCompleted: number
  public isRegistered: boolean

  public readonly createdAt?: Date
  public readonly updatedAt?: Date
  public readonly deletedAt?: Date
}
export function init(sequelize: Sequelize) {
Student.init(
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
  },
  makeModelOptions(sequelize, 'students')
)
}
export default Student
