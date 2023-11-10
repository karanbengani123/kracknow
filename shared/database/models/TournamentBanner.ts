import { DataTypes, Model, Sequelize } from "sequelize";
import { makeModelOptions } from "../../helpers/makeModelOptions";

class TournamentBanner extends Model {
  public uuid?: string;
  public tournamentUUID: string;
  public url: string;

  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
  public readonly deletedAt?: Date;
}
export function init(sequelize: Sequelize) {
  TournamentBanner.init(
    {
      uuid: {
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID,
      },
      tournamentUUID: {
        allowNull: false,
        type: DataTypes.UUID,
      },

      url: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    makeModelOptions(sequelize, "tournament_banner")
  );
}
export default TournamentBanner;
