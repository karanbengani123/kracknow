import { DataTypes, Model, Sequelize } from "sequelize";
import { makeModelOptions } from "../../helpers/makeModelOptions";

class PrizeAmountHistory extends Model {
  public uuid: string;
  public studentUUID: string;
  public examScheduleUUID: string;
  public tournamentScheduleUUID: string;
  public scheduleExamParticipationUUID: string;
  public tournamentParticipationUUID: string;

  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
  public readonly deletedAt?: Date;
}
export function init(sequelize: Sequelize) {
  PrizeAmountHistory.init(
    {
      uuid: {
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID,
      },
      studentUUID: {
        allowNull: false,
        type: DataTypes.UUID
      },
      examScheduleUUID: {        
        type: DataTypes.UUID
      },
      tournamentScheduleUUID: {        
        type: DataTypes.UUID
      },
      scheduleExamParticipationUUID: {        
        type: DataTypes.UUID
      },
      tournamentParticipationUUID: {
        type: DataTypes.UUID
      },
    
    },
    makeModelOptions(sequelize, "prize_amount_history")
  );
}
export default PrizeAmountHistory;
