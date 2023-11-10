import { DataTypes, Model, Sequelize } from "sequelize";
import { makeModelOptions } from "../../helpers/makeModelOptions";

class NotificationTemplate extends Model {
  public identifier: string;
  public communicationType: string;
  public template: string;
  public renderer: string;
  public subject?: string;
  public locale: string;

  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
}
export function init(sequelize: Sequelize) {
  NotificationTemplate.init(
    {
      communicationType: {
        allowNull: false,
        type: DataTypes.STRING(20),
      },
      identifier: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING(100),
      },
      locale: {
        allowNull: false,
        type: DataTypes.STRING(2),
      },
      renderer: {
        allowNull: false,
        type: DataTypes.STRING(20),
      },
      subject: {
        allowNull: false,
        type: DataTypes.STRING(250),
      },
      template: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
    },
    makeModelOptions(sequelize, "notification_templates")
  );
}
export default NotificationTemplate;
