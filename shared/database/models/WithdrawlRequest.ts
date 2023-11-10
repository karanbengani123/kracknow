import { double } from "aws-sdk/clients/lightsail";
import { DataTypes, Model, Sequelize } from "sequelize";
import { makeModelOptions } from "../../helpers/makeModelOptions";

class WithdrawlRequest extends Model {
  public uuid: string;
  public studentUUID: string;
  public ammount: double;
  public status: string;
  public statusMsg: string;
  public transferId: string;
  public transferMode: string;
  public remarks: string;
  public upiID: string;
  public bankName: string;
  public accountHolder: string;
  public accountNumber: string;
  public IFSCCode: string;

  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
  public readonly deletedAt?: Date;
}
export function init(sequelize: Sequelize) {
  WithdrawlRequest.init(
    {
      uuid: {
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID,
      },

      studentUUID: {
        allowNull: false,
        type: DataTypes.UUID,
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
      transferId: {
        type: DataTypes.STRING(100),
      },
      upiID: {
        type: DataTypes.STRING(50),
      },
      transferMode: {
        allowNull: false,
        type: DataTypes.ENUM("upi", "paytm", "bank"),
      },
      remarks: {
        type: DataTypes.STRING(100),
      },
      bankName: {
        type: DataTypes.STRING(50),
      },
      accountHolder: {
        type: DataTypes.STRING(50),
      },
      accountNumber: {
        type: DataTypes.STRING(50),
      },
      IFSCCode: {
        type: DataTypes.STRING(50),
      },
    },
    makeModelOptions(sequelize, "withdrawal_request")
  );
}
export default WithdrawlRequest;
