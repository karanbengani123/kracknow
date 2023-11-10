import { DataTypes, Model, Sequelize } from "sequelize";
import { makeModelOptions } from "../../helpers/makeModelOptions";

class City extends Model {
  public uuid?: string;
  public city: string;
  public countryCode: string;

  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
  public readonly deletedAt?: Date;
}
export function init(sequelize: Sequelize) {
  City.init(
    {
      uuid: {
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID,
      },

      countryCode: {
        allowNull: false,
        type: DataTypes.STRING(10),
      },

      city: {
        allowNull: false,
        type: DataTypes.STRING(50),
      },
    },
    makeModelOptions(sequelize, "cities")
  );
}
export default City;
