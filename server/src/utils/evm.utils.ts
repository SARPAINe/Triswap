import { Web3 } from 'web3'
import { config } from '../config'

export const connectBC = async () => {
  const url = config.blockchain.rpc_url
  const web3 = new Web3(url)
  return web3
}
