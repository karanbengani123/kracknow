import { DataTypes, Model, Sequelize } from 'sequelize'
import { makeModelOptions } from '../../helpers/makeModelOptions'
class Keyword extends Model {
    public attribute: string;

    public readonly createdAt?: Date;
    public readonly updatedAt?: Date;
    public readonly deletedAt?: Date;
}
export function init(sequelize: Sequelize) {
Keyword.init({
  attribute: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING(100)
  },

  status: {
    allowNull: false,
    type: DataTypes.BOOLEAN
  }

}, makeModelOptions(sequelize, 'keywords'))
}
export default Keyword
