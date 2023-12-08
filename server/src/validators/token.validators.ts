import Joi from 'joi'
import { uuidv4Pattern } from '../utils'

export const createTokenSchema = Joi.object({
  token: Joi.string().trim().uppercase().min(3).max(10).required(),
  description: Joi.string().trim(),
  address: Joi.string().trim().required(),
})

export const createTokenPairSchema = Joi.object({
  tokenAId: Joi.string().trim().regex(uuidv4Pattern).required(),
  tokenBId: Joi.string().trim().regex(uuidv4Pattern).required(),
  pairAddress: Joi.string().trim().required(),
})
