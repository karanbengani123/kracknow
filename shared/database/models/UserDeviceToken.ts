import { DataTypes, Model, Sequelize } from "sequelize";
import { makeModelOptions } from "../../helpers/makeModelOptions";

class UserDeviceToken extends Model {
  public uuid: string;
  public userId: string;
  public deviceId: string;
  public token: string;
  public type: string;

  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
  public readonly deletedAt?: Date;
}
export function init(sequelize: Sequelize) {
  UserDeviceToken.init(
    {
      uuid: {
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID,
      },

      userId: {
        allowNull: false,
        type: DataTypes.STRING(100),
      },
      deviceId: {
        type: DataTypes.STRING,
      },

      token: {
        allowNull: false,
        type: DataTypes.STRING,
      },

      type: {
        allowNull: false,
        type: DataTypes.ENUM("WEBSOCKET", "FCM"),
      },
    },
    makeModelOptions(sequelize, "user_device_token")
  );
}
export default UserDeviceToken;
