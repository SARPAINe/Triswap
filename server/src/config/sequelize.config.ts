import { type Sequelize } from 'sequelize'
import { setupTestDBMemory } from './database/sequelize-test.config'
import { setupDevDB } from './database/sequelize-dev.config'
import { setupStgDB } from './database/sequelize-stg.config'

let sequelize: Sequelize = setupDevDB()

if (process.env.NODE_ENV === 'development') {
  console.log('Running development db')
  sequelize = setupDevDB()
} else if (process.env.NODE_ENV === 'staging') {
  console.log('Running staging db')
  sequelize = setupStgDB()
} else if (process.env.NODE_ENV === 'test') {
  console.log('Running test db')
  sequelize = setupTestDBMemory()
}

export default sequelize
