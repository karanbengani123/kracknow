import { DataTypes, Model, Sequelize } from "sequelize";
import { makeModelOptions } from "../../helpers/makeModelOptions";

class BankAccount extends Model {
  public uuid?: string;
  public userId: string;
  public upi: string;
  public qrCodeImage: string;

  public isActive: boolean;

  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
  public readonly deletedAt?: Date;
}

export function init(sequelize: Sequelize) {
  BankAccount.init(
    {
      uuid: {
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID,
      },
      bankName: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      receiverName: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      upi: {
        allowNull: false,
        type: DataTypes.STRING(15),
      },
      qrCodeImage: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      isActive: {
        allowNull: true,
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    makeModelOptions(sequelize, "admin_bank_account")
  );
}

export default BankAccount;
