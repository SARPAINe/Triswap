import { DataTypes, Model } from 'sequelize'
import config from '../config'
const sequelize = config.db.sequelize

class User extends Model {
  public id!: number
  public username!: string
  public role!: string
  public email!: string
  public password!: string
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
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

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { tableName: 'users', sequelize },
)

export default User
