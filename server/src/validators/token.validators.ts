import Joi from 'joi'

export const createTokenPairSchema = Joi.object({
  pairAddress: Joi.string().trim().required(),
  tokenA: {
    name: Joi.string().trim().required(),
    address: Joi.string().trim().required(),
  },
  tokenB: {
    name: Joi.string().trim().required(),
    address: Joi.string().trim().required(),
  },
})
