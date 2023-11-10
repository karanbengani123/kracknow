import { DataTypes, Model, Sequelize } from "sequelize";
import { makeModelOptions } from "../../helpers/makeModelOptions";

class Internationalization extends Model {
  public key: string;
  public locale: string;
  public scope: string;
  public translation: string;
  public uuid?: string;

  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
}
export function init(sequelize: Sequelize) {
  Internationalization.init(
    {
      key: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      locale: {
        allowNull: false,
        type: DataTypes.STRING(10),
      },
      scope: {
        allowNull: false,
        type: DataTypes.STRING(100),
      },
      translation: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      uuid: {
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID,
      },
    },
    makeModelOptions(sequelize, "internationalizations")
  );
}
export default Internationalization;
