import { DataTypes, Model, Sequelize } from "sequelize";
import { makeModelOptions } from "../../helpers/makeModelOptions";
class Feedback extends Model {
  public uuid?: string;
  public studentUUID: string;
  public message: string;
  public topic: string;
  public status: string;

  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
  public readonly deletedAt?: Date;
}
export function init(sequelize: Sequelize) {
  Feedback.init(
    {
      uuid: {
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID,
      },

      studentUUID: {
        allowNull: false,
        type: DataTypes.UUID,
      },

      message: {
        allowNull: false,
        type: DataTypes.STRING,
      },

      topic: {
        allowNull: false,
        type: DataTypes.STRING,
      },

      status: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    makeModelOptions(sequelize, "feedbacks")
  );
}
export default Feedback;
