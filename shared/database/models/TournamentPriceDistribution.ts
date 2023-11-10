import { double } from "aws-sdk/clients/lightsail";
import { DataTypes, Model, Sequelize } from "sequelize";
import { makeModelOptions } from "../../helpers/makeModelOptions";

class TournamentPriceDistribution extends Model {
  public uuid: string;
  public tournamentScheduleUUID: string;
  public studentUUID: string;
  public amount: double;
  public rank: number;
  public marks: number;
  public name: string;
  public correct: string;
  public incorrect: string;
  public answered: string;
  public skipped: string;
  public timeout: string;

  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
  public readonly deletedAt?: Date;
}
export function init(sequelize: Sequelize) {
  TournamentPriceDistribution.init(
    {
      uuid: {
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID,
      },

      tournamentScheduleUUID: {
        allowNull: false,
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

      rank: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      marks: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      correct: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      incorrect: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      answered: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      skipped: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      timeout: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING(100),
      },
    },
    makeModelOptions(sequelize, "tournament_price_distribution")
  );
}
export default TournamentPriceDistribution;
