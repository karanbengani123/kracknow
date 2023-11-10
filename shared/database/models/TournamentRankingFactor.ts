import { DataTypes, Model, Sequelize } from "sequelize";
import { makeModelOptions } from "../../helpers/makeModelOptions";

class TournamentRankingFactor extends Model {
  public uuid: string;
  public tournamentUUID: string;
  public type: string;
  public title: string;
  public time: number;
  public points: number;
  public coins: number;

  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
  public readonly deletedAt?: Date;
}
export function init(sequelize: Sequelize) {
  TournamentRankingFactor.init(
    {
      uuid: {
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID,
      },

      tournamentUUID: {
        allowNull: false,
        type: DataTypes.UUID,
      },

      type: {
        allowNull: false,
        type: DataTypes.ENUM(
          "ON_CORRECT_ANSWER",
          "ON_INCORRECT_ANSWER",
          "TIME_LIMIT",
          "PRIMARY",
          "SECONDARY"
        ),
      },

      title: {
        allowNull: false,
        type: DataTypes.STRING,
      },

      time: {
        type: DataTypes.INTEGER,
      },

      points: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      coins: {
        type: DataTypes.INTEGER,
      },
    },
    makeModelOptions(sequelize, "tournament_ranking_factor")
  );
}
export default TournamentRankingFactor;
