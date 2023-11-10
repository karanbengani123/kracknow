import { DataTypes, Model, Sequelize } from "sequelize";
import { makeModelOptions } from "../../helpers/makeModelOptions";

class Permission extends Model {
  public uuid?: string;
  public attribute: string;

  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
  public readonly deletedAt?: Date;
}
export function init(sequelize: Sequelize) {
  Permission.init(
    {
      uuid: {
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID,
      },

      attribute: {
        allowNull: false,
        type: DataTypes.UUID,
      },
    },
    makeModelOptions(sequelize, "permissions")
  );
}
export default Permission;
