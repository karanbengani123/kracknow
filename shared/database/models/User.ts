import { DataTypes, Model, Sequelize } from "sequelize";
import { makeModelOptions } from "../../helpers/makeModelOptions";

class User extends Model {
  public uuid?: string;
  public name: string;
  public email: string;
  public password: string;
  public roleUUID: string;
  public isRoot: boolean;
  public status: boolean;
  public profilePic: string;

  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
  public readonly deletedAt?: Date;
}
export function init(sequelize: Sequelize) {
  User.init(
    {
      uuid: {
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID,
      },

      name: {
        allowNull: false,
        type: DataTypes.STRING(100),
      },

      email: {
        allowNull: false,
        type: DataTypes.STRING,
      },

      password: {
        allowNull: false,
        type: DataTypes.STRING(64),
      },

      roleUUID: {
        allowNull: false,
        type: DataTypes.UUID,
      },

      isRoot: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },

      status: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },

      profilePic: {
        allowNull: true,
        type: DataTypes.STRING,
      },
    },
    makeModelOptions(sequelize, "users")
  );
}
export default User;
