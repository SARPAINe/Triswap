// import { type Sequelize } from 'sequelize'

import User from './user.models'
import Auth from './auth.models'

const defineAssociations = () => {
  // To create a One-To-One relationship, the hasOne and belongsTo associations are used together;
  User.hasOne(Auth, { foreignKey: 'userId', onDelete: 'CASCADE' })
  Auth.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' })
}
/*

User.hasOne(Auth, { foreignKey: 'userId', onDelete: 'CASCADE' })
here,
- User is source model
- Auth is target model
means that a One-To-One relationship exists between User and Auth, with the foreign key being defined in the target model Auth.

Auth.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' })
means that a One-To-One relationship exists between Auth and User, with the foreign key being defined in the source model Auth.
*/

export default defineAssociations
