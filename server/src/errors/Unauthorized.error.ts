import { StatusCodes } from 'http-status-codes'
import CustomAPIError from './CustomError.error'

class UnauthorizedError extends CustomAPIError {
  statusCode: number
  name: string

  constructor(message: string) {
    super(message)
    this.statusCode = StatusCodes.FORBIDDEN
    this.name = 'UnauthorizedError'
  }
}

export default UnauthorizedError
