import { DataTypes, Model, Sequelize } from "sequelize";
import { makeModelOptions } from "../../helpers/makeModelOptions";

class ExamParticipationQuestion extends Model {
  public uuid: string;
  public examParticipationUUID: string;
  public questionUUID: string;
  public title: string;
  public description: string;
  public mark: number;
  public coin: number;
  public status: string;
  public isCorrect: boolean;
  public givenAnswer: string;

  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
  public readonly deletedAt?: Date;
}
export function init(sequelize: Sequelize) {
  ExamParticipationQuestion.init(
    {
      uuid: {
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID,
      },

      examParticipationUUID: {
        allowNull: false,
        type: DataTypes.UUID,
      },

      questionUUID: {
        allowNull: false,
        type: DataTypes.UUID,
      },

      title: {
        type: DataTypes.STRING(5000),
      },

      description: {
        allowNull: true,
        type: DataTypes.STRING(500),
      },

      mark: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      coin: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      status: {
        type: DataTypes.ENUM("ANSWERED", "SKIPPED", "TIME_OUT"),
      },

      isCorrect: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },

      givenAnswer: {
        type: DataTypes.STRING,
      },
    },
    makeModelOptions(sequelize, "exam_participation_questions")
  );
}
export default ExamParticipationQuestion;
