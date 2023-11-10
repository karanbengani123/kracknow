import { Model, DataTypes, Sequelize } from "sequelize";
import { makeModelOptions } from "../../helpers/makeModelOptions";

class KeyValue extends Model {
  public key: string;
  public intValue: string;
  public stringValue: string;

  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date;
}
export function init(sequelize: Sequelize) {
  KeyValue.init(
    {
      key: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      intValue: {
        type: DataTypes.INTEGER,
      },
      stringValue: {
        type: DataTypes.TEXT,
      },
    },
    makeModelOptions(sequelize, "key_value")
  );
}
export default KeyValue;
