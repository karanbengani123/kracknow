import { DataTypes, Model, Sequelize } from "sequelize";
import { makeModelOptions } from "../../helpers/makeModelOptions";
import { double } from "aws-sdk/clients/lightsail";

class Exam extends Model {
  public uuid: string;
  public identifier: string;
  public title: string;
  public categoryUUID: string;
  public description: string;
  public allowPrimarySelection: boolean;
  public allowSecondarySelection: boolean;
  public isFeatured: boolean;
  public marksPerQuestion: number;
  public status: string;
  public totalQuestions: number;
  public studentLimit: number;
  public isFree: boolean;
  public joinFee: double;
  public joinDelay: number;
  public totalWinningPrize: number;
  public timePerQuestion: number;
  public projectedTotalWinningPrice: double;
  public realizedTotalWinningPrice: double;
  public type: string;
  public isLastRecord: boolean;

  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
  public readonly deletedAt?: Date;
}
export function init(sequelize: Sequelize) {
  Exam.init(
    {
      uuid: {
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID,
      },

      identifier: {
        allowNull: false,
        type: DataTypes.STRING(50),
      },

      title: {
        allowNull: false,
        type: DataTypes.STRING,
      },

      categoryUUID: {
        allowNull: false,
        type: DataTypes.UUID,
      },

      description: {
        allowNull: true,
        type: DataTypes.STRING(500),
      },
      allowPrimarySelection: {
        type: DataTypes.BOOLEAN,
      },
      allowSecondarySelection: {
        type: DataTypes.BOOLEAN,
      },
      isFeatured: {
        type: DataTypes.BOOLEAN,
      },

      marksPerQuestion: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      status: {
        type: DataTypes.ENUM("ACTIVE", "SCHEDULED", "COMPLETED"),
      },
      studentLimit: {
        type: DataTypes.INTEGER,
      },
      isFree: {
        type: DataTypes.BOOLEAN,
      },

      joinDelay: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      totalWinningPrize: {
        type: DataTypes.INTEGER,
      },
      timePerQuestion: {
        type: DataTypes.INTEGER,
      },
      joinFee: {
        type: DataTypes.DOUBLE,
      },

      projectedTotalWinningPrice: {
        type: DataTypes.DOUBLE,
      },

      realizedTotalWinningPrice: {
        type: DataTypes.DOUBLE,
      },
      totalQuestions: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      type: {
        allowNull: false,
        type: DataTypes.ENUM("EXAM", "QUIZ", "MOCK_TEST"),
      },
      isLastRecord: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      }
    },
    makeModelOptions(sequelize, "exams")
  );
}
export default Exam;
