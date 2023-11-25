import { DataTypes, Model, Sequelize } from "sequelize";
import { makeModelOptions } from "../../helpers/makeModelOptions";
import { text } from "aws-sdk/clients/customerprofiles";

class student_addmoney_request extends Model {
  public uuid: string;
  public studentUUID: string;
  public status: string;
  public transactionId: string;
  public transactionImage: text;
  public amount: number;
  public referenceId: string;
  public approvedby: string;
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
  public readonly deletedAt?: Date;
}

export function init(sequelize: Sequelize) {
  student_addmoney_request.init(
    {
      uuid: {
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID,
      },
      studentUUID: {
        allowNull: false,
        type: DataTypes.UUID,
      },
      status: {
        allowNull: false,
        type: DataTypes.ENUM("PENDING", "SUCCESS"),
      },
      amount: {
        allowNull: false,
        type: DataTypes.STRING(50),
      },
      transactionId: {
        type: DataTypes.STRING(100),
      },
      transactionImage: {
        type: DataTypes.TEXT,
      },
      referenceId: {
        type: DataTypes.STRING,
      },
      approvedby: {
        type: DataTypes.UUIDV4,
      },
    },
    makeModelOptions(sequelize, "student_addmoney_request")
  );
}
export default student_addmoney_request;
