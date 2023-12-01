// import { type Sequelize } from 'sequelize'

import User from './user.models'
import Auth from './auth.models'
import Token from './token.models'
import TokenPair from './tokenPair.models'
import Pair from './pair.models'

const defineAssociations = () => {
  // user-auth association one-to-one
  User.hasOne(Auth, { foreignKey: 'userId', onDelete: 'CASCADE' })
  Auth.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' })

  // user-token association one-to-many
  User.hasMany(Token, { foreignKey: 'userId' })
  Token.belongsTo(User, { foreignKey: 'userId' })

  // user-tokenPair association one-to-many
  User.hasMany(Pair, { foreignKey: 'userId' })
  Pair.belongsTo(User, { foreignKey: 'userId' })

  // token-tokenPair association many-to-many
  Token.belongsToMany(Pair, {
    through: TokenPair,
    foreignKey: 'tokenAId',
    as: 'TokenAPairs',
  })

  Token.belongsToMany(Pair, {
    through: TokenPair,
    foreignKey: 'tokenBId',
    as: 'TokenBPairs',
  })
  Pair.belongsToMany(Token, {
    through: TokenPair,
    foreignKey: 'tokenAId',
    as: 'TokenAPairs',
  })
  Pair.belongsToMany(Token, {
    through: TokenPair,
    foreignKey: 'tokenBId',
    as: 'TokenBPairs',
  })
}

export default defineAssociations
