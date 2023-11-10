import { DataTypes, Model, Sequelize } from "sequelize";
import { makeModelOptions } from "../../helpers/makeModelOptions";

class ExamBanner extends Model {
  public uuid?: string;
  public url: string;
  public phoneBanner: string;

  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
  public readonly deletedAt?: Date;
}
export function init(sequelize: Sequelize) {
  ExamBanner.init(
    {
      uuid: {
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID,
      },

      url: {
        allowNull: false,
        type: DataTypes.STRING,
      },

      phoneBanner: {
        type: DataTypes.STRING,
      },
    },
    makeModelOptions(sequelize, "exam_banner")
  );
}
export default ExamBanner;
