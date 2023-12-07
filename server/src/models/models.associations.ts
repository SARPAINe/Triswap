import User from './user.models'
import Auth from './auth.models'
import Token from './token.models'
import TokenPair from './tokenPair.models'

const defineAssociations = () => {
  // To create a One-To-One relationship, the hasOne and belongsTo associations are used together;
  User.hasOne(Auth, { foreignKey: 'userId', onDelete: 'CASCADE' })
  Auth.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' })

  // user-token association one-to-many
  User.hasMany(Token, { foreignKey: 'userId' })
  Token.belongsTo(User, { foreignKey: 'userId' })

  // token-tokenPair association many-to-many (as 'tokenA' and 'tokenB')
  Token.hasMany(TokenPair, { foreignKey: 'tokenAId', as: 'tokenA' })
  TokenPair.belongsTo(Token, { foreignKey: 'tokenAId', as: 'tokenA' })

  Token.hasMany(TokenPair, { foreignKey: 'tokenBId', as: 'tokenB' })
  TokenPair.belongsTo(Token, { foreignKey: 'tokenBId', as: 'tokenB' })
}

export default defineAssociations
