// import { DataTypes, Model, Sequelize } from "sequelize";
// import { makeModelOptions } from "../../helpers/makeModelOptions";
// // import { text } from "aws-sdk/clients/customerprofiles";

// class BankAccount extends Model {
//   public uuid?: string;
//   public upi: string;
//   public qrCodeImage: string;
//   public bankName: string;
//   public account: string;
//   public ifsc: string;

//   public readonly createdAt?: Date;
//   public readonly updatedAt?: Date;
//   public readonly deletedAt?: Date;
// }

// export function init(sequelize: Sequelize) {
//   BankAccount.init(
//     {
//       uuid: {
//         allowNull: false,
//         defaultValue: DataTypes.UUIDV4,
//         primaryKey: true,
//         type: DataTypes.UUID,
//       },
//       upi: {
//         allowNull: false,
//         type: DataTypes.STRING(50),
//       },
//       qrCodeImage: {
//         allowNull: true,
//         type: DataTypes.TEXT,
//       },
//       bankName: {
//         allowNull: true,
//         type: DataTypes.STRING,
//       },
//       account: {
//         allowNull: true,
//         type: DataTypes.STRING,
//       },
//       ifsc: {
//         allowNull: true,
//         type: DataTypes.STRING,
//       },
      
//     },
//     makeModelOptions(sequelize, "admin_bank_account")
//   );
// }

// export default BankAccount;

// models/bankAccount.js

import { DataTypes, Model, Sequelize } from "sequelize";
import { makeModelOptions } from "../../helpers/makeModelOptions";
import { Text } from "aws-sdk/clients/inspector";

class BankAccount extends Model {
  public uuid?: string;
  public upi: string;
  public qrCodeImage: Text;
  public bankName: string;
  public account: string;
  public ifsc: string;

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
      upi: {
        allowNull: false,
        type: DataTypes.STRING(50),
      },
      qrCodeImage: {
        allowNull: true,
        type: DataTypes.TEXT,
      },
      bankName: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      account: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      ifsc: {
        allowNull: true,
        type: DataTypes.STRING,
      },
    },
    makeModelOptions(sequelize, "admin_bank_account")
  );
}

export default BankAccount;
