import { DataTypes, Model, Sequelize } from "sequelize";

class Bundle extends Model {
  public uuid?: number; // Auto-incrementing primary key
  public bundle_name: 'small_pack' | 'medium_pack' | 'large_pack' | 'extra_large'; // Bundle types
  public amount_coins: number; // Amount in coins
  public amount_rupees: number; // Amount in rupees
  public deletedAt?: Date | null; // Timestamp for soft deletion
  public status: number; // Status as a TINYINT (0 for inactive, 1 for active)
  public readonly createdAt?: Date; // Created timestamp
  public readonly updatedAt?: Date; // Updated timestamp
}

// Function to initialize the model
export function init(sequelize: Sequelize) {
  Bundle.init(
    {
      uuid: {
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID,
      },
      bundle_name: {
        type: DataTypes.ENUM('small_pack', 'medium_pack', 'large_pack', 'extra_large'),
        allowNull: false,
      },
      amount_coins: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      amount_rupees: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true, // Nullable for soft delete
      },
      status: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 1, // Default to active
      },
    },
    {
      sequelize,
      tableName: 'bundles',
      timestamps: true, // Automatically manage createdAt and updatedAt
    }
  );
}

export default Bundle;
