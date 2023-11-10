import { DataTypes, Model, Sequelize } from "sequelize";
import { makeModelOptions } from "../../helpers/makeModelOptions";

class Question extends Model {
  public uuid: string;
  public categoryUUID: string;
  public subCategoryUUID: string;
  public title: string;
  public description: string;
  public appearedExamCount: number;
  public status: string;

  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
  public readonly deletedAt?: Date;
}
export function init(sequelize: Sequelize) {
  Question.init(
    {
      uuid: {
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID,
      },

      categoryUUID: {
        allowNull: false,
        type: DataTypes.UUID,
      },

      subCategoryUUID: {
        allowNull: false,
        type: DataTypes.UUID,
      },

      title: {
        allowNull: false,
        type: DataTypes.STRING(100),
      },

      description: {
        allowNull: true,
        type: DataTypes.STRING(500),
      },

      appearedExamCount: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },

      status: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
    },
    makeModelOptions(sequelize, "questions")
  );
}
export default Question;
