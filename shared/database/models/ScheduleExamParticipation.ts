import { DataTypes, Model, Sequelize } from "sequelize";
import { makeModelOptions } from "../../helpers/makeModelOptions";

class ScheduleExamParticipation extends Model {
  public uuid?: string;
  public examScheduleUUID: string;
  public examUUID: string;
  public studentUUID: string;
  public status: string;
  public marks: number;
  public completedTime: Date;
  public startedTime: Date;
  public primarySubcategory: string;
  public secondarySubcategory: string;
  public answeredMilliSeconds: number;
  public coins: number;

  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
  public readonly deletedAt?: Date;
}
export function init(sequelize: Sequelize) {
  ScheduleExamParticipation.init(
    {
      uuid: {
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID,
      },

      examScheduleUUID: {
        allowNull: false,
        type: DataTypes.UUID,
      },

      examUUID: {
        allowNull: false,
        type: DataTypes.UUID,
      },

      studentUUID: {
        allowNull: false,
        type: DataTypes.UUID,
      },

      status: {
        type: DataTypes.ENUM("COMPLETED", "NOT_COMPLETED", "REGISTERED"),
      },

      marks: {
        type: DataTypes.INTEGER,
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
      coins: {
        type: DataTypes.DOUBLE,
      }
    },
    makeModelOptions(sequelize, "schedule_exam_participation")
  );
}
export default ScheduleExamParticipation;
