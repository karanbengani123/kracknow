import { DataTypes, Model, Sequelize } from "sequelize";
import { makeModelOptions } from "../../helpers/makeModelOptions";

class TournamentSchedule extends Model {
  public uuid: string;
  public tournamentUUID: string;
  public startTime: Date;
  public endTime: Date;
  public tournamentTime: string;
  public joined: number;
  public completed: number;
  public status: string;

  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
  public readonly deletedAt?: Date;
}
export function init(sequelize: Sequelize) {
  TournamentSchedule.init(
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

      startTime: {
        type: DataTypes.DATE,
      },

      endTime: {
        type: DataTypes.DATE,
      },
      joined: {
        type: DataTypes.INTEGER,
      },
      completed: {
        type: DataTypes.INTEGER,
      },
      status: {
        type: DataTypes.ENUM("SCHEDULED", "COMPLETED"),
      },
      tournamentTime: {
        type: DataTypes.ENUM("FULL_DAY", "BASED_ON_TIME"),
        allowNull: false,
        defaultValue: "BASED_ON_TIME",
      },
    },
    makeModelOptions(sequelize, "tournament_schedule")
  );
}
export default TournamentSchedule;
