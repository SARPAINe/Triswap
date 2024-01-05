import Joi from 'joi'

export const createTokenPairSchema = Joi.object({
  pairAddress: Joi.string().trim().required(),
  tokenAId: Joi.string().trim().required(),
  tokenBId: Joi.string().trim().required(),
})

export const createTokenSchema = Joi.object({
  name: Joi.string().trim().uppercase().required(),
  address: Joi.string().trim().required(),
  description: Joi.string().trim(),
})
