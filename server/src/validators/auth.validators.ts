import Joi from 'joi'

const uuidv4Pattern =
  /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/

const jwtPattern = /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.[A-Za-z0-9-_.+/=]*$/

const email = Joi.string().email().trim().lowercase().required()
const password = Joi.string().required().min(6).max(12).required()

export const registerUserSchema = Joi.object({
  lastName: Joi.string().min(3).max(10).trim().lowercase(),
  firstName: Joi.string().min(3).max(10).trim().lowercase(),
  image: Joi.string(),
  phone: Joi.number(),
  email,
  password,
})

export const loginUserSchema = Joi.object({
  email,
  password,
})

export const verifyEmailSchema = Joi.object({
  token: Joi.string().regex(uuidv4Pattern).required().messages({
    'string.base': 'Please provide a valid token.',
    'string.pattern.base': 'The provided token is not valid.',
    'any.required': 'Email verification token is required.',
  }),
})

export const forgotPasswordSchema = Joi.object({
  email,
})

export const resetPasswordSchema = Joi.object({
  newPassword: password,
})

export const resetPasswordTokenSchema = Joi.object({
  token: Joi.string().regex(jwtPattern).required().messages({
    'string.base': 'Please provide a valid token.',
    'string.pattern.base': 'The provided token is not valid.',
    'any.required': 'password rest token is required.',
  }),
})

export const changePasswordSchema = Joi.object({
  password,
  newPassword: password,
})
