/* eslint-disable no-unused-vars */
import { DataTypes, Model, Sequelize } from "sequelize";
import { makeModelOptions } from "../../helpers/makeModelOptions";

class Banner extends Model {
  public uuid: string;
  public url: string;
  public tag: string;

  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
  public readonly deletedAt?: Date;
}
export function init(sequelize: Sequelize) {
  Banner.init(
    {
      uuid: {
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID,
      },

      url: {
        allowNull: false,
        type: DataTypes.STRING,
      },

      tag: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    makeModelOptions(sequelize, "banners")
  );
}
export default Banner;
