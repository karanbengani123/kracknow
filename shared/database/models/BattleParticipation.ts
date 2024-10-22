import { DataTypes, Model, Sequelize } from "sequelize";

class BattleParticipation extends Model {
  public uuid?: string;
  public battleUUID: string;
  public studentUUID: string;
  public join_time: Date;
  public completion_time?: Date;
  public status: 'Registered' | 'Playing' | 'Complete';

  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
}

export function init(sequelize: Sequelize) {
  BattleParticipation.init(
    {
      uuid: {
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID,
      },
      battleUUID: {
        allowNull: false,
        type: DataTypes.UUID,
      },
      studentUUID: {
        allowNull: false,
        type: DataTypes.UUID,
      },
      join_time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      completion_time: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM('Registered', 'Playing', 'Complete'),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'battle_participation',
      timestamps: true,
    }
  );
}

export default BattleParticipation;
