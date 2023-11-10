import { DataTypes, Model, Sequelize } from "sequelize";
import { makeModelOptions } from "../../helpers/makeModelOptions";

class SubCategory extends Model {
  public uuid?: string;
  public icon: string;
  public label: string;
  public categoryUUID: string;
  public status: string;

  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
  public readonly deletedAt?: Date;
}
export function init(sequelize: Sequelize) {
  SubCategory.init(
    {
      uuid: {
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID,
      },

      icon: {
        allowNull: true,
        type: DataTypes.STRING,
      },

      label: {
        allowNull: false,
        type: DataTypes.STRING(100),
      },

      categoryUUID: {
        allowNull: false,
        type: DataTypes.UUID,
      },

      status: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
    },
    makeModelOptions(sequelize, "sub_category")
  );
}
export default SubCategory;
