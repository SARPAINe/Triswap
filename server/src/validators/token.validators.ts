import Joi from 'joi'

export const createTokenSchema = Joi.object({
  token: Joi.string().trim().uppercase().min(3).max(10).required(),
  description: Joi.string().trim(),
  address: Joi.string().trim(),
})
