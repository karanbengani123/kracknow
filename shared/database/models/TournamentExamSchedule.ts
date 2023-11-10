import { DataTypes, Model, Sequelize } from "sequelize";
import { makeModelOptions } from "../../helpers/makeModelOptions";

class TournamentExamSchedule extends Model {
  public uuid: string;
  public serialNo: number;
  public tournamentUUID: string;
  public tournamentScheduleUUID: string;
  public examUUID: string;

  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
  public readonly deletedAt?: Date;
}
export function init(sequelize: Sequelize) {
  TournamentExamSchedule.init(
    {
      uuid: {
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID,
      },
      serialNo: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      tournamentUUID: {
        allowNull: false,
        type: DataTypes.UUID,
      },
      tournamentScheduleUUID: {
        type: DataTypes.UUID,
      },
      examUUID: {
        allowNull: false,
        type: DataTypes.UUID,
      }
    },
    makeModelOptions(sequelize, "tournament_exams_schedule")
  );
}
export default TournamentExamSchedule;
