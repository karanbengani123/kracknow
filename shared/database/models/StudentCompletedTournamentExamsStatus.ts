import { DataTypes, Model, Sequelize } from "sequelize";
import { makeModelOptions } from "../../helpers/makeModelOptions";

class StudentCompletedTournamentExamsStatus extends Model {
  public uuid: string;
  public examUUID: string;
  public tournamentParticipationUUID: string;
  public completed: boolean;

  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
  public readonly deletedAt?: Date;
}
export function init(sequelize: Sequelize) {
  StudentCompletedTournamentExamsStatus.init(
    {
      uuid: {
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID,
      },
      examUUID: {
        allowNull: false,
        type: DataTypes.UUID,
      },
      tournamentParticipationUUID: {
        allowNull: false,
        type: DataTypes.UUID,
      },
      completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },
    makeModelOptions(sequelize, "student_completed_tournament_exams_status")
  );
}
export default StudentCompletedTournamentExamsStatus;
