import { DataTypes, Model, Sequelize } from "sequelize";
import { makeModelOptions } from "../../helpers/makeModelOptions";

class TournamentParticipationExam extends Model {
  public uuid?: string;
  public tournamentParticipationUUID: string;
  public tournamentExamUUID: string;
  public status: string;
  public marks: number;
  public completedTime: Date;
  public startedTime: Date;

  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
  public readonly deletedAt?: Date;
}
export function init(sequelize: Sequelize) {
  TournamentParticipationExam.init(
    {
      uuid: {
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID,
      },

      tournamentParticipationUUID: {
        allowNull: false,
        type: DataTypes.UUID,
      },

      tournamentExamUUID: {
        allowNull: false,
        type: DataTypes.UUID,
      },

      status: {
        allowNull: false,
        type: DataTypes.ENUM("Active", "In-Active"),
      },

      marks: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },

      completedTime: {
        allowNull: false,
        type: DataTypes.DATE,
      },

      startedTime: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    makeModelOptions(sequelize, "tournament_participation_exams")
  );
}
export default TournamentParticipationExam;
