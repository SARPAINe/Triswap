import morgan from 'morgan'
import path from 'path'
import fs from 'fs'

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, '../..', 'access.log'),
  { flags: 'a' },
)

const morganConfig =
  process.env.NODE_ENV === 'production'
    ? morgan('combined', { stream: accessLogStream })
    : morgan('dev')

export default morganConfig
