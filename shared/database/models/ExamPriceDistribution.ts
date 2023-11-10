import { double } from "aws-sdk/clients/lightsail";
import { DataTypes, Model, Sequelize } from "sequelize";
import { makeModelOptions } from "../../helpers/makeModelOptions";

class ExamPriceDistribution extends Model {
  public uuid?: string;
  public examScheduleUUID: string;
  public studentUUID: string;
  public amount: double;
  public rank: number;

  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
  public readonly deletedAt?: Date;
}
export function init(sequelize: Sequelize) {
  ExamPriceDistribution.init(
    {
      uuid: {
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID,
      },

      examScheduleUUID: {
        allowNull: false,
        type: DataTypes.UUID,
      },

      studentUUID: {
        allowNull: false,
        type: DataTypes.UUID,
      },

      amount: {
        allowNull: false,
        type: DataTypes.DOUBLE,
      },

      rank: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    makeModelOptions(sequelize, "exam_price_distribution")
  );
}
export default ExamPriceDistribution;
