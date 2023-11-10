import { DataTypes, Model, Sequelize } from "sequelize";
import { makeModelOptions } from "../../helpers/makeModelOptions";

class ExamSchedule extends Model {
  public uuid?: string;
  public examUUID: string;
  public startTime: Date;
  public endTime: Date;
  public examTime: string;
  public joined: number;
  public completed: number;
  public status: string;

  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
  public readonly deletedAt?: Date;
}
export function init(sequelize: Sequelize) {
  ExamSchedule.init(
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
      examTime: {
        type: DataTypes.ENUM("FULL_DAY", "BASED_ON_TIME"),
        allowNull: false,
        defaultValue: "BASED_ON_TIME",
      },
    },
    makeModelOptions(sequelize, "exam_schedule")
  );
}
export default ExamSchedule;
