/* eslint-disable no-unused-vars */
import { DataTypes, Model, Sequelize } from "sequelize";
import { makeModelOptions } from "../../helpers/makeModelOptions";

class ExamPriceRatio extends Model {
  public uuid: string;
  public examUUID: string;
  public fromValue: number;
  public toValue: number;
  public amount: number;

  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
  public readonly deletedAt?: Date;
}
export function init(sequelize: Sequelize) {
  ExamPriceRatio.init(
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

      fromValue: {
        type: DataTypes.INTEGER,
      },

      toValue: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },

      amount: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    makeModelOptions(sequelize, "exam_prize_ratio")
  );
}
export default ExamPriceRatio;
