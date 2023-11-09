import { StatusCodes } from 'http-status-codes'
import CustomAPIError from './CustomError.error'

class UnauthenticatedError extends CustomAPIError {
  statusCode: number

  constructor(message: string) {
    super(message)
    this.statusCode = StatusCodes.UNAUTHORIZED
  }
}

export default UnauthenticatedError
