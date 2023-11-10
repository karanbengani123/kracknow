import { DataTypes, Model, Sequelize } from 'sequelize'
import { makeModelOptions } from '../../helpers/makeModelOptions'

class ScheduledRule extends Model {
    public uuid: string;
    public ruleName: string;
    public isDeleted: boolean;
    public eventType: string;


    public readonly createdAt?: Date;
    public readonly updatedAt?: Date;
    public readonly deletedAt?: Date;
}
export function init(sequelize: Sequelize) {
    ScheduledRule.init(
        {
            uuid: {
                allowNull: false,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                type: DataTypes.UUID
            },
            ruleName: {
                allowNull: false,
                type: DataTypes.STRING
            },
            isDeleted: {
                allowNull: false,
                type: DataTypes.BOOLEAN
            }, eventType: {
                type: DataTypes.STRING
            }
        },
        makeModelOptions(sequelize, 'scheduled_rule')
    )
}
export default ScheduledRule