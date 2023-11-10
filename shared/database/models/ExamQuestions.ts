/* eslint-disable no-unused-vars */
import { DataTypes, Model, Sequelize } from "sequelize";
import { makeModelOptions } from "../../helpers/makeModelOptions";

class ExamQuestion extends Model {
  uuid: string;
  examUUID: string;
  questionUUID: string;

  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
  public readonly deletedAt?: Date;
}
export function init(sequelize: Sequelize) {
  ExamQuestion.init(
    {
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

      questionUUID: {
        allowNull: false,
        type: DataTypes.UUID,
      },
    },
    makeModelOptions(sequelize, "exam_questions")
  );
}
export default ExamQuestion;
