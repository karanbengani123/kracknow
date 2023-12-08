import { DataTypes, Model, Sequelize } from 'sequelize'
import { makeModelOptions } from '../../helpers/makeModelOptions'

class Wallet extends Model {
  public uuid: string
  public studentUUID: string
  public balance: number

  public readonly createdAt?: Date
  public readonly updatedAt?: Date
  public readonly deletedAt?: Date
}
export function init(sequelize: Sequelize) {
  
Wallet.init(
  {
    uuid: {
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      type: DataTypes.UUID
    },

    studentUUID: {
      allowNull: false,
      type: DataTypes.UUID
    },

    balance: {
      allowNull: false,
      type: DataTypes.DOUBLE
    },

    // status: {
    //   allowNull: true,
    //   type: DataTypes.ENUM("PENDING", "COMPLETED"),
    // },

    // transaction_id:{
    //   allowNull: false,
    //   type: DataTypes.NUMBER
    // }
  },
  makeModelOptions(sequelize, 'wallet')
)
}
export default Wallet
