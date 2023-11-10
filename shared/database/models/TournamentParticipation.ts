import { DataTypes, Model, Sequelize } from "sequelize";
import { makeModelOptions } from "../../helpers/makeModelOptions";

class TournamentParticipation extends Model {
  public uuid: string;
  public tournamentScheduleUUID: string;
  public tournamentUUID: string;
  public studentUUID: string;
  public status: string;
  public marks: number;
  public coins: number;
  public completedTime: Date;
  public startedTime: Date;
  public answeredMilliSeconds: number;
  public primarySubcategory: string;
  public secondarySubcategory: string;

  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
  public readonly deletedAt?: Date;
}
export function init(sequelize: Sequelize) {
  TournamentParticipation.init(
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
      tournamentUUID: {
        allowNull: false,
        type: DataTypes.UUID,
      },

      status: {
        type: DataTypes.ENUM("COMPLETED", "NOT_COMPLETED", "REGISTERED", "APPEARED"),
      },

      marks: {
        allowNull: false,
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      coins: {
        type: DataTypes.DOUBLE,
        defaultValue: 0
      },
      completedTime: {
        type: DataTypes.DATE,
      },

      startedTime: {
        type: DataTypes.DATE,
      },
      primarySubcategory: {
        type: DataTypes.UUID,
      },

      secondarySubcategory: {
        type: DataTypes.UUID,
      },
      answeredMilliSeconds: {
        type: DataTypes.INTEGER,
      },
    },
    makeModelOptions(sequelize, "tournament_participation")
  );
}
export default TournamentParticipation;
