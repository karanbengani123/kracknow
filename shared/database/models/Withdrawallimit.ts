import { Model, DataTypes, Sequelize } from "sequelize";
import { makeModelOptions } from "../../helpers/makeModelOptions";

class Withdrawallimit extends Model {
  public key: string;
  public minval: string;
  public maxval: string;
  public stringValue: string;

  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date;
}
export function init(sequelize: Sequelize) {
  Withdrawallimit.init(
    {
      key: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      minval: {
        type: DataTypes.INTEGER,
      },
      maxval: {
        type: DataTypes.INTEGER,
      },
      stringValue: {
        type: DataTypes.TEXT,
      },
    },
    makeModelOptions(sequelize, "withdrawal_limit")
  );
}
export default Withdrawallimit;
