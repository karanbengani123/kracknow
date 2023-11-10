import { DataTypes, Model, Sequelize } from "sequelize";
import { makeModelOptions } from "../../helpers/makeModelOptions";

class ExamKeyword extends Model {
  public uuid?: string;
  public examUUID: string;
  public attribute: string;

  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
  public readonly deletedAt?: Date;
}
export function init(sequelize: Sequelize) {
  ExamKeyword.init(
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

      attribute: {
        allowNull: false,
        type: DataTypes.STRING(100),
      },
    },
    makeModelOptions(sequelize, "exam_keywords")
  );
}

export default ExamKeyword;
