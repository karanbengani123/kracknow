import { DataTypes, Model, Sequelize } from "sequelize";
import { makeModelOptions } from "../../helpers/makeModelOptions";

class TournamentCity extends Model {
  public uuid?: string;
  public tournamentUUID: string;
  public cityUUID: string;

  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
  public readonly deletedAt?: Date;
}
export function init(sequelize: Sequelize) {
  TournamentCity.init(
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

      cityUUID: {
        allowNull: false,
        type: DataTypes.UUID,
      },
    },
    makeModelOptions(sequelize, "tournament_cities")
  );
}
export default TournamentCity;
