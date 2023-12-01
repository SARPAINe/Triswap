import { DataTypes, Model } from 'sequelize'
import sequelize from '../config/sequelize.config'
import User from './user.models'

class Pair extends Model {
  declare id: string
  declare userId: string
  declare pairAddress: string
}

Pair.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    pairAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'pair',
  },
)

export default Pair
