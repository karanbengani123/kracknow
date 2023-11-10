import { DataTypes, Model, Sequelize } from "sequelize";
import { makeModelOptions } from "../../helpers/makeModelOptions";

class AdminSummary extends Model {
  public uuid?: string;
  public attribute: string;
  public count: string;

  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
  public readonly deletedAt?: Date;
}
export function init(sequelize: Sequelize) {
  AdminSummary.init(
    {
      uuid: {
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID,
      },

      attribute: {
        allowNull: false,
        type: DataTypes.STRING,
      },

      count: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    makeModelOptions(sequelize, "admin_summary")
  );
}
export default AdminSummary;
