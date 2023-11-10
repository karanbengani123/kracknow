import { DataTypes, Model, Sequelize } from "sequelize";
import { makeModelOptions } from "../../helpers/makeModelOptions";

class TournamentScheduledExam extends Model {
  public uuid: string;
  public tournamentScheduleUUID: string;
  public tournamentExamScheduleUUID: string;
  public examUUID: string;
  public startTime: Date;
  public endTime: Date;
  public examTime: string;
  public status: string;

  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
  public readonly deletedAt?: Date;
}
export function init(sequelize: Sequelize) {
  TournamentScheduledExam.init(
    {
      uuid: {
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID,
      },
      tournamentScheduleUUID:{
        allowNull: false,
        type: DataTypes.UUID,
      },
      tournamentExamScheduleUUID:{
        allowNull: false,
        type: DataTypes.UUID,
      },
      examUUID: {
        allowNull: false,
        type: DataTypes.UUID,
      },

      startTime: {
        type: DataTypes.DATE,
      },

      endTime: {
        type: DataTypes.DATE,
      },
      status: {
        type: DataTypes.ENUM("SCHEDULED", "COMPLETED"),
      },
      examTime: {
        type: DataTypes.ENUM("FULL_DAY", "BASED_ON_TIME"),
        allowNull: false,
        defaultValue: "BASED_ON_TIME",
      },
    },
    makeModelOptions(sequelize, "tournament_scheduled_exam")
  );
}
export default TournamentScheduledExam;
