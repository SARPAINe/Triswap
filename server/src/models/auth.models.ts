import { DataTypes, Model } from 'sequelize'
import config from '../config'
const sequelize = config.db.sequelize

class Auth extends Model {
  public id!: string
  public userId!: string
  public password!: string
  public isVerified!: boolean
  public verificationToken!: string | null
  public passwordResetToken!: string | null
}

Auth.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },

    verificationToken: {
      type: DataTypes.STRING,
    },
    passwordResetToken: {
      type: DataTypes.STRING,
    },
  },
  { tableName: 'auth', sequelize },
)

export default Auth
