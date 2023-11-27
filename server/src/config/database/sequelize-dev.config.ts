import { Sequelize, type Options } from 'sequelize'

const database = process.env.DB_DATABASE!
const user = process.env.DB_USER!
const password = process.env.DB_PASSWORD!
const host = process.env.DB_HOST!

export const setupDevDB = (): Sequelize => {
  const sequelizeOptions: Options = { host, dialect: 'mysql' }
  const sequelize = new Sequelize(database, user, password, sequelizeOptions)
  return sequelize
}

export const closeDevDB = (sequelize: Sequelize): Promise<void> => {
  return sequelize.close()
}
