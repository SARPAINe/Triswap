import { Sequelize, type Options } from 'sequelize'

const database = process.env.DB_DATABASE!
const user = process.env.DB_USER!
const password = process.env.DB_PASSWORD!

export const setupDB = (): Sequelize => {
  const sequelizeOptions: Options = {
    host: process.env.DB_HOST!,
    dialect: 'mysql',
  }
  const sequelize = new Sequelize(database, user, password, sequelizeOptions)
  return sequelize
}

export const closeDB = (sequelize: Sequelize): Promise<void> => {
  return sequelize.close()
}
