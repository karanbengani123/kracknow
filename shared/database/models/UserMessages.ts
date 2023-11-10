import { DataTypes, Model, Sequelize } from "sequelize";
import { makeModelOptions } from "../../helpers/makeModelOptions";

class UserMessages extends Model {
  public uuid: string;
  public userId: string;
  public message: string;
  public meta: object;
  public read: boolean;

  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date;
}
export function init(sequelize: Sequelize) {
  UserMessages.init(
    {
      uuid: {
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        type: DataTypes.UUID,
      },
      userId: {
        allowNull: false,
        type: DataTypes.UUID,
      },
      message: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      meta: {
        allowNull: true,
        type: DataTypes.JSON,
      },
      read: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    makeModelOptions(sequelize, "user_message")
  );
}
export default UserMessages;
