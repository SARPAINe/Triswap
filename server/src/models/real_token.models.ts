import { DataTypes, Model } from 'sequelize'
import sequelize from './../config/sequelize.config'

class RealToken extends Model {
  declare id: string
  declare name: string
  declare description: string
  declare price: number[]
  static async addPrices(
    tokenName: string,
    newPrices: number[],
  ): Promise<void> {
    try {
      const token = await RealToken.findOne({ where: { name: tokenName } })

      if (token) {
        token.price = [...token.price, ...newPrices]
        await token.save()
      } else {
        throw new Error('Token not found')
      }
    } catch (error: any) {
      throw new Error(`Error adding prices: ${error.message}`)
    }
  }
}

RealToken.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.JSON, // Use JSON type instead of ARRAY
      defaultValue: [],
      get() {
        // Parse the stored JSON string to an array
        const rawValue = this.getDataValue('price')
        return rawValue ? JSON.parse(rawValue) : []
      },
      set(value: number[]) {
        // Store the array as a JSON string
        this.setDataValue('price', JSON.stringify(value))
      },
    },
  },
  {
    sequelize,
    tableName: 'realToken',
  },
)

export default RealToken
