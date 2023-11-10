import { DataTypes, Model, Sequelize } from 'sequelize'
import { makeModelOptions } from '../../helpers/makeModelOptions'

class TournamentExamParticipationQuestion extends Model {
  public uuid: string;
  public tournamentParticipationUUID: string;
  public examUUID: string;
  public questionUUID: string;
  public title: string;
  public description: string;
  public mark: number;
  public coin:number;
  public status: string;
  public isCorrect: boolean;
  public givenAnswer: string;

  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
  public readonly deletedAt?: Date;
}
export function init(sequelize: Sequelize) {
  TournamentExamParticipationQuestion.init({
    uuid: {
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      type: DataTypes.UUID
    },

    tournamentParticipationUUID: {
      allowNull: false,
      type: DataTypes.UUID
    },

    questionUUID: {
      allowNull: false,
      type: DataTypes.UUID
    },
    examUUID: {
      allowNull: false,
      type: DataTypes.UUID
    },

    title: {
      allowNull: false,
      type: DataTypes.TEXT
    },

    description: {
      type: DataTypes.STRING(500)
    },

    mark: {
      allowNull: false,
      type: DataTypes.INTEGER
    },

    coin: {
      allowNull: false,
      type: DataTypes.INTEGER
    },

    status: {
      allowNull: false,
      type: DataTypes.ENUM("ANSWERED", "SKIPPED", "TIME_OUT")
    },

    isCorrect: {
      allowNull: false,
      type: DataTypes.BOOLEAN
    },

    givenAnswer: {
      allowNull: false,
      type: DataTypes.STRING
    }

  }, makeModelOptions(sequelize, 'tournament_exam_participation_questions'))
}
export default TournamentExamParticipationQuestion
