import dotenv from 'dotenv'

const envFound = dotenv.config()
if (envFound.error) {
  throw new Error('No .env file found')
}

export default {
  port: parseInt(process.env.PORT!, 10),
  logs: {
    morgan: process.env.MORGAN!,
  },
  blockchain: {
    rpc_url: process.env.RPC_URL!,
  },
  node: {
    env: process.env.NODE_ENV,
  },
}
