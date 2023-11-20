import bcrypt from 'bcrypt'

const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10)
}

const cryptoServices = { hashPassword }
export { cryptoServices }
