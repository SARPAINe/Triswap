import { RequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'
import { userServices } from '../services/user.services'
import { NotFoundError } from '../errors'
import type User from '../models/user.models'

interface IApiResponse<T> {
  success: boolean
  message: string
  count?: number
  data?: T
}

const getAllUsers: RequestHandler = async (req, res) => {
  const users = await userServices.getAllUsers()

  const apiResponse: IApiResponse<User[]> = {
    success: true,
    message: 'All user data retrieved successfully ',
    count: users.length,
    data: users,
  }
  res.status(StatusCodes.OK).json(apiResponse)
}

const getUser: RequestHandler = async (req, res) => {
  const { id: userId } = req.params
  console.log(userId)
  const user = await userServices.getSingleUser(userId)

  if (!user) {
    throw new NotFoundError('User not found')
  }

  const apiResponse = {
    success: true,
    message: 'User data retrieved successfully',
    data: user,
  }
  res.status(StatusCodes.OK).json(apiResponse)
}

const getMe: RequestHandler = async (req, res) => {
  const user = await userServices.getMe(req.user as User)
  const apiResponse = {
    success: true,
    message: 'User data retrieved successfully',
    data: user,
  }
  res.status(StatusCodes.OK).json(apiResponse)
}

export { getAllUsers, getUser, getMe }
