import { DataTypes, Model, Sequelize } from "sequelize";
import { makeModelOptions } from "../../helpers/makeModelOptions";

class BankNameList extends Model {
  public bankName: string;

  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
  public readonly deletedAt?: Date;
}
export function init(sequelize: Sequelize) {
  BankNameList.init(
    {
      bankName: {
        type: DataTypes.STRING(50),
        allowNull: false,
        primaryKey: true,
      },
    },
    makeModelOptions(sequelize, "bank_name_list")
  );
}
export default BankNameList;
