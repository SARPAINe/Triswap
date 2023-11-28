// import { type Sequelize } from 'sequelize'

import User from './user.models'
import Auth from './auth.models'

const defineAssociations = () => {
  User.hasOne(Auth, { foreignKey: 'userId' })
  Auth.belongsTo(User, { foreignKey: 'userId' })
}

export default defineAssociations
