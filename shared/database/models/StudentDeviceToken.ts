import { DataTypes, Model, Sequelize } from "sequelize";
import { makeModelOptions } from "../../helpers/makeModelOptions";

class StudentDeviceToken extends Model {
  public uuid?: string;
  public studentUUID: string;
  public tokenList: string;

  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
  public readonly deletedAt?: Date;
}
export function init(sequelize: Sequelize) {
  StudentDeviceToken.init(
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

      tokenList: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    makeModelOptions(sequelize, "student_device_tokens")
  );
}
export default StudentDeviceToken;
