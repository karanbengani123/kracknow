import { DataTypes, Model, Sequelize } from "sequelize";
import { makeModelOptions } from "../../helpers/makeModelOptions";

class StudentKeyword extends Model {
  public uuid?: string;
  public studentUUID: string;
  public attribute: string;

  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
  public readonly deletedAt?: Date;
}
export function init(sequelize: Sequelize) {
  StudentKeyword.init(
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

      attribute: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    makeModelOptions(sequelize, "student_keywords")
  );
}
export default StudentKeyword;
