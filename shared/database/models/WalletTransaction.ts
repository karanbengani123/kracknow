import { double } from "aws-sdk/clients/lightsail";
import { DataTypes, Model, Sequelize } from "sequelize";
import { makeModelOptions } from "../../helpers/makeModelOptions";

class WalletTransaction extends Model {
  public uuid: string;
  public examType: string;
  public examTitle: string;
  public examUUID: string;
  public tournamentUUID: string;
  public walletUUID: string;
  public type: string;
  public amount: double;
  public status: string;
  public statusMsg: string;
  public paymentMode: string;
  public orderId: string;
  public referenceId: string;
  public paymentDate: Date;

  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
  public readonly deletedAt?: Date;
}
export function init(sequelize: Sequelize) {
  WalletTransaction.init(
    {
      uuid: {
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID,
      },
      examType: {
        type: DataTypes.ENUM("EXAM", "QUIZ", "MOCK_TEST", "TOURNAMENT"),
      },
      examTitle: {
        type: DataTypes.STRING,
      },
      examUUID: {
        type: DataTypes.UUID,
      },
      tournamentUUID: {
        type: DataTypes.UUID,
      },
      walletUUID: {
        allowNull: false,
        type: DataTypes.UUID,
      },
      type: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      amount: {
        allowNull: false,
        type: DataTypes.DOUBLE,
      },

      status: {
        allowNull: false,
        type: DataTypes.ENUM("PENDING", "SUCCESS"),
      },
      statusMsg: {
        type: DataTypes.STRING,
      },
      paymentMode: {
        type: DataTypes.STRING,
      },
      orderId: {
        type: DataTypes.STRING,
      },
      referenceId: {
        type: DataTypes.STRING,
      },
      paymentDate: {
        type: DataTypes.DATE,
      },
    },
    makeModelOptions(sequelize, "wallet_transactions")
  );
}
export default WalletTransaction;
