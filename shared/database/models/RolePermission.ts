import { DataTypes, Model, Sequelize } from "sequelize";
import { makeModelOptions } from "../../helpers/makeModelOptions";
class RolePermission extends Model {
  public uuid?: string;
  public roleUUID: string;
  public permissionUUID: string;

  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
  public readonly deletedAt?: Date;
}
export function init(sequelize: Sequelize) {
  RolePermission.init(
    {
      uuid: {
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID,
      },
      roleUUID: {
        allowNull: false,
        type: DataTypes.UUID,
      },
      permissionUUID: {
        allowNull: false,
        type: DataTypes.UUID,
      },
    },
    makeModelOptions(sequelize, "role-permissions")
  );
}
export default RolePermission;
