import { DataTypes, Model } from 'sequelize'
import sequelize from '../config/sequelize.config'
import Token from './token.models'
import Pair from './pair.models'

class TokenPair extends Model {
  declare id: string
  declare tokenAId: string
  declare tokenBId: string
  declare pairId: string
}

TokenPair.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    pairId: {
      type: DataTypes.UUID,
      unique: true,
      allowNull: false,
      references: {
        model: Pair,
        key: 'id',
      },
    },
    tokenAId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Token,
        key: 'id',
      },
    },
    tokenBId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Token,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    tableName: 'token_pair',
  },
)

export default TokenPair
