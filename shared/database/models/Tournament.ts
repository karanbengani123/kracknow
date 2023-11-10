import { double } from "aws-sdk/clients/lightsail";
import { DataTypes, Model, Sequelize } from "sequelize";
import { makeModelOptions } from "../../helpers/makeModelOptions";

class Tournament extends Model {
  public uuid: string;
  public categoryUUID: string;
  public title: string;
  public identifier: string;
  public webBanner: string;
  public phoneBanner: string;
  public isFree: boolean;
  public joinFee: double;
  public joinDelay: number;
  public winningPrice: double;
  public isFeatured: boolean;
  public marksPerQuestion: number;
  public studentLimit: number;
  public description: string;
  public joined: number;
  public completed: number;
  public timePerQuestion: number;
  public pending: number;
  public allowPrimarySelection: boolean;
  public allowSecondarySelection: boolean;

  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
  public readonly deletedAt?: Date;
}
export function init(sequelize: Sequelize) {
  Tournament.init(
    {
      uuid: {
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID,
      },
      categoryUUID: {
        allowNull: false,
        type: DataTypes.UUID,
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING(100),
      },
      identifier: {
        allowNull: false,
        type: DataTypes.STRING(50),
      },
      webBanner: {
        type: DataTypes.STRING,
      },
      phoneBanner: {
        type: DataTypes.STRING,
      },
      timePerQuestion: {
        type: DataTypes.INTEGER,
      },
      isFree: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      winningPrice: {
        allowNull: false,
        type: DataTypes.DOUBLE,
      },

      joinFee: {
        allowNull: false,
        type: DataTypes.DOUBLE,
      },
      isFeatured: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      studentLimit: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },

      description: {
        allowNull: false,
        type: DataTypes.STRING(500),
      },
      marksPerQuestion: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      joinDelay: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      joined: {
        type: DataTypes.INTEGER,
      },

      completed: {
        type: DataTypes.INTEGER,
      },

      pending: {
        type: DataTypes.INTEGER,
      },
      isLastRecord: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      allowPrimarySelection: {
        type: DataTypes.BOOLEAN,
      },
      allowSecondarySelection: {
        type: DataTypes.BOOLEAN,
      },
    },
    makeModelOptions(sequelize, "tournaments")
  );
}
export default Tournament;
