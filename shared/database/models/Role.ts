import { DataTypes, Model, Sequelize } from "sequelize";
import { makeModelOptions } from "../../helpers/makeModelOptions";

class Role extends Model {
  public uuid?: string;
  public roleName: string;

  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
  public readonly deletedAt?: Date;
}
export function init(sequelize: Sequelize) {
  Role.init(
    {
      uuid: {
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        type: DataTypes.UUID,
      },

      roleName: {
        allowNull: false,
        type: DataTypes.ENUM('UPSER_ADMIN','ADMIN','EXAM_CREATOR','QUESTION_CREATOR'),
      },
    },
    makeModelOptions(sequelize, "roles")
  );
}
export default Role;
