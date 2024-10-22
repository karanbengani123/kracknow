import { DataTypes, Model, Sequelize } from "sequelize";
import { makeModelOptions } from "../../helpers/makeModelOptions";

class ExamBanner extends Model {
  public uuid?: string;
  public url: string;
  public phoneBanner: string;
  public videoAdUrl: string | null;
  public isVideoAdEnabled: boolean;

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

      videoAdUrl: {
        type: DataTypes.STRING, // Nullable column for videoAdUrl
        allowNull: true,        // Allowing null for this column
      },
      isVideoAdEnabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,  // Default to false if not provided
        allowNull: false,     // Not nullable as it has a default
      },
    },
    makeModelOptions(sequelize, "exam_banner")
  );
}
export default ExamBanner;
