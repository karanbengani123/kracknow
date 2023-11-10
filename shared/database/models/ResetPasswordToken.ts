import { DataTypes, Model, Sequelize } from "sequelize";
import { makeModelOptions } from "../../helpers/makeModelOptions";

class ResetPasswordToken extends Model {
  public user: string;
  public uuid: string;
  public token: string;
  public tokenExpiryTime: Date;
  public readonly createdAt?: Date;
  public readonly UpdatedAt?: Date;
}
export function init(sequelize: Sequelize) {
  ResetPasswordToken.init(
    {
      token: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      tokenExpiryTime: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      user: {
        type: DataTypes.UUID,
      },
      uuid: {
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID,
      },
    },
    makeModelOptions(sequelize, "reset_password_tokens")
  );
}
export default ResetPasswordToken;
