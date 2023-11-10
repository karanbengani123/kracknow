import { DataTypes, Model, Sequelize } from 'sequelize'
import { makeModelOptions } from '../../helpers/makeModelOptions'

class ExamCity extends Model {
    public uuid?: string;
    public examUUID: string;
    public cityUUID: string;

    public readonly createdAt?: Date;
    public readonly updatedAt?: Date;
    public readonly deletedAt?: Date;
}
export function init(sequelize: Sequelize) {
ExamCity.init({
  uuid: {
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    type: DataTypes.UUID
  },

  examUUID: {
    allowNull: false,
    type: DataTypes.UUID
  },

  cityUUID: {
    allowNull: false,
    type: DataTypes.UUID
  }
}, makeModelOptions(sequelize, 'exam_cities'))
}
export default ExamCity
