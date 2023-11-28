import { DataTypes, Model } from 'sequelize'
import { config } from '../config'
const sequelize = config.db.sequelize

class User extends Model {
  public id!: string
  public username!: string
  public role!: string
  public email!: string
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },

    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    role: {
      type: DataTypes.ENUM('ADMIN', 'USER'),
      allowNull: false,
      defaultValue: 'USER',
    },
  },
  { tableName: 'users', sequelize },
)

export default User
