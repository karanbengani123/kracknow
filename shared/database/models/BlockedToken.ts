import { DataTypes, Model, Sequelize } from "sequelize";
import { makeModelOptions } from "../../helpers/makeModelOptions";

class BlockedToken extends Model {
  public token: string;
  public uuid?: string;

  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
  public readonly deletedAt?: Date;
}
export function init(sequelize: Sequelize) {
  BlockedToken.init(
    {
      token: {
        allowNull: false,
        type: DataTypes.STRING(500),
      },
      uuid: {
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID,
      },
    },
    makeModelOptions(sequelize, "blocked_tokens")
  );
}

export default BlockedToken;
