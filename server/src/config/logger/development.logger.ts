import winston from 'winston'
import { format } from 'winston'
const { combine, timestamp, printf, colorize } = format

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}] ${message}`
})

const developmentLogger = (): winston.Logger => {
  const logger = winston.createLogger({
    level: 'debug',
    format: combine(timestamp({ format: 'HH:mm:ss' }), colorize(), myFormat),
    transports: [new winston.transports.Console()],
  })
  return logger
}

export default developmentLogger
